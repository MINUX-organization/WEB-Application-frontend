import { FButton, FCheckbox, FContainer, FModal } from '@/shared/ui';
import { useQuery } from 'react-query';
import { editGpusForFlightSheets, getGpusForFlightSheets } from '../api';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useStateObj } from '@/shared/lib';
import { useBoolean } from 'usehooks-ts';
import { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import styles from './GpuListModal.module.scss';
import _ from 'lodash';

type GpuListModalProps = {
  itemId: number
  isOpen: ReturnType<typeof useBoolean>
  onUpdate: () => void
}

export default function GpuListModal({ itemId, isOpen, onUpdate }: GpuListModalProps) {
  const gpuListQuery = useQuery(
    ["load gpu for flight sheet"],
    () => getGpusForFlightSheets({}),
    { enabled: false, onError: (error: any) => toast.error(error.message) }
  );

  const modifiedGpuList = useStateObj<
    Exclude<typeof gpuListQuery.data, undefined>["data"]["gpusForFlightSheets"]
  >([]);

  const isUpdatingGPUList = useBoolean(false);

  const updateModifiedGpuListItem = (
    gpuId: number,
    flightSheetId: number | null
  ) => {
    modifiedGpuList.setValue((prev) => {
      const found = prev.find((gpu) => gpu.id === gpuId);
      if (found !== undefined) {
        if (flightSheetId === null) {
          const oldFlightSheetId =
            gpuListQuery.data!.data.gpusForFlightSheets.find(
              (gpu) => gpu.id === gpuId
            )!.flightSheetId;
          found.flightSheetId =
            oldFlightSheetId !== itemId ? oldFlightSheetId : null;
        } else {
          found.flightSheetId = flightSheetId;
        }
      }
      return [...prev];
    });
  }

  const resetGpuList = () => {
    if (gpuListQuery.data === undefined) {
      modifiedGpuList.setValue([]);
    } else {
      modifiedGpuList.setValue(
        _.cloneDeep(gpuListQuery.data.data.gpusForFlightSheets)
      );
    }
  }

  const cancelGpuList = () => {
    resetGpuList();
    isOpen.setFalse();
  }

  const updateFlightGPUList = () => {
    isUpdatingGPUList.setTrue();
    editGpusForFlightSheets({
      gpusForFlightSheets: modifiedGpuList.value.map((v) =>
        _.omit(v, "name", "connected")
      ),
    })
      .then((res) => {
        onUpdate();
        toast.info("updated gpus for flight sheets");
      })
      .catch((e) => {
        toast.info(e.message);
      })
      .finally(() => {
        isUpdatingGPUList.setFalse();
      });
  }

  useEffect(() => {
    resetGpuList();
  }, [gpuListQuery.data])

  useEffect(() => {
    if (isOpen.value) {
      gpuListQuery.refetch()
    }
  }, [isOpen.value])

  return (
    <FModal
        title="Select GPU"
        open={isOpen.value}
        onClose={() => isOpen.setFalse()}
        bodyProps={{ className: styles["modal-body"] }}
      >
        <FContainer
          className={styles["gpu-list-container"]}
          visibility={{ tc: false }}
          bodyProps={{ className: styles["gpu-list-container-body"] }}
        >
          {gpuListQuery.isFetching && (
            <Spin
              size="large"
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            />
          )}
          {gpuListQuery.data !== undefined &&
            modifiedGpuList.value.length === 0 && (
              <div className="w-fit mx-auto ">nothing found</div>
            )}
          <Scrollbars
            autoHide
            className={styles["gpu-list"]}
            renderTrackVertical={(props) => (
              <div {...props} className={styles["scroll-track"]} />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className={styles["scroll-thumb"]} />
            )}
          >
            {gpuListQuery.data !== undefined &&
              (() => {
                const orphans = modifiedGpuList.value.filter(
                  (v) => !v.connected
                );
                const connected = modifiedGpuList.value
                  .filter((v) => v.connected)
                  .sort((a, b) => a.id - b.id);
                return (
                  <>
                    {orphans.length !== 0 && (
                      <div className={styles["notification"]}>
                        <span>{orphans.length}</span>Orphan GPUs
                      </div>
                    )}
                    {connected.map((gpu) => (
                      <div
                        key={gpu.id + " " + gpu.flightSheetId}
                        className={styles["gpu-item"]}
                        onClick={() =>
                          updateModifiedGpuListItem(
                            gpu.id,
                            !(gpu.flightSheetId === itemId)
                              ? itemId
                              : null
                          )
                        }
                      >
                        <div className={styles["gpu-item-index"]}>{gpu.id}</div>
                        <div className={styles["gpu-item-name"]}>
                          {gpu.name}
                        </div>
                        <FCheckbox
                          className={styles["checkbox"]}
                          value={gpu.flightSheetId === itemId}
                        />
                      </div>
                    ))}
                  </>
                );
              })()}
          </Scrollbars>
        </FContainer>
        <div className={styles["modal-buttons"]}>
          <FButton severity="bad" onClick={cancelGpuList}>
            Cancel
          </FButton>
          <FButton
            loading={isUpdatingGPUList.value}
            severity="good"
            onClick={updateFlightGPUList}
          >
            Apply
          </FButton>
        </div>
      </FModal>
  )
}
