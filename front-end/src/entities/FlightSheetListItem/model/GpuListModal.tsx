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
import { editGpusForFlightSheetsMultiple } from '@/shared/api';

type GpuListModalProps = {
  flightSheetType: 'single' | 'multiple'
  itemId: number;
  isOpen: ReturnType<typeof useBoolean>;
  onUpdate: () => void;
};

export default function GpuListModal({
  flightSheetType,
  itemId,
  isOpen,
  onUpdate,
}: GpuListModalProps) {
  const gpuListQuery = useQuery(
    ['load gpu for flight sheet'],
    () => getGpusForFlightSheets({}),
    { enabled: false, onError: (error: any) => toast.error(error.message) }
  );

  const modifiedGpuList = useStateObj<
    Exclude<typeof gpuListQuery.data, undefined>['data']['gpusForFlightSheets']
  >([]);

  const isUpdatingGPUList = useBoolean(false);

  const handleSelectAllGpus = () => {
    modifiedGpuList.setValue((prev) => {
      prev.forEach((gpu) => {
        gpu.flightSheetId = itemId;
      });
      return [...prev];
    });
  };

  const handleDeselectAllGpus = () => {
    modifiedGpuList.setValue((prev) => {
      prev.forEach((gpu) => {
        const oldFlightSheetId =
          gpuListQuery.data!.data.gpusForFlightSheets.find(
            (oldGpu) => oldGpu.id === gpu.id
          )!.flightSheetId;
        gpu.flightSheetId =
          oldFlightSheetId !== itemId ? oldFlightSheetId : null;
      });
      return [...prev];
    });
  };

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
  };

  const resetGpuList = () => {
    if (gpuListQuery.data === undefined) {
      modifiedGpuList.setValue([]);
    } else {
      modifiedGpuList.setValue(
        _.cloneDeep(gpuListQuery.data.data.gpusForFlightSheets)
      );
    }
  };

  const cancelGpuList = () => {
    resetGpuList();
    isOpen.setFalse();
  };

  const updateFlightGPUList = () => {
    isUpdatingGPUList.setTrue();

    const doFetch = () => {
      switch (flightSheetType) {
        case 'multiple':
          return (
            editGpusForFlightSheetsMultiple({
              gpusForFlightSheets: modifiedGpuList.value.map((v) => ({
                id: v.id,
                flightSheetMultipleId: v.flightSheetId
              })),
            })
          )
        case 'single':
          return (
            editGpusForFlightSheets({
              gpusForFlightSheets: modifiedGpuList.value.map((v) => ({
                id: v.id,
                flightSheetId: v.flightSheetId
              })),
            })
          )
      }
    }

    doFetch()
      .then((res) => {
        onUpdate();
        toast.info('updated gpus for flight sheets');
      })
      .catch((e) => {
        toast.info(e.message);
      })
      .finally(() => {
        isUpdatingGPUList.setFalse();
      });
  };

  useEffect(() => {
    resetGpuList();
  }, [gpuListQuery.data]);

  useEffect(() => {
    if (isOpen.value) {
      gpuListQuery.refetch();
    }
  }, [isOpen.value]);

  return (
    <FModal
      title="Select GPU"
      open={isOpen.value}
      onClose={() => isOpen.setFalse()}
      bodyProps={{ className: styles['gpu-list-modal'] }}
    >
      <FContainer
        className={styles['gpu-list-modal__container']}
        visibility={{ tc: false }}
        bodyProps={{ className: styles['gpu-list-modal__container-body'] }}
      >
        <div className={styles['gpu-list-modal__top-buttons']}>
          <button
            className={styles['gpu-list-modal__button']}
            onClick={handleDeselectAllGpus}
          >
            Deselect all
          </button>
          <button
            className={styles['gpu-list-modal__button']}
            onClick={handleSelectAllGpus}
          >
            Select all
          </button>
        </div>
        {{
          idle: () => null,
          loading: () => (
            <Spin size="large" className={styles['gpu-list-modal__spinner']} />
          ),
          error: () => (
            <div>
              Error fetching gpus
              <button className={styles['gpu-list-modal__button']}>
                Retry
              </button>
            </div>
          ),
          success: () =>
            gpuListQuery.data && (
              <>
                {modifiedGpuList.value.length === 0 && (
                  <div className={styles['gpu-list-modal__not-found-text']}>
                    nothing found
                  </div>
                )}
                {modifiedGpuList.value.length !== 0 && (
                  <Scrollbars
                    autoHide
                    className={styles['gpu-list-modal__scrollbars']}
                    renderTrackVertical={(props) => (
                      <div
                        {...props}
                        className={
                          styles['gpu-list-modal__scrollbars-scroll-track']
                        }
                      />
                    )}
                    renderThumbVertical={(props) => (
                      <div
                        {...props}
                        className={
                          styles['gpu-list-modal__scrollbars-scroll-thumb']
                        }
                      />
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
                              <div className={styles['notification']}>
                                <span>{orphans.length}</span>Orphan GPUs
                              </div>
                            )}
                            {connected.map((gpu) => (
                              <div
                                key={gpu.id + ' ' + gpu.flightSheetId}
                                className={styles['gpu-list-modal__gpu-item']}
                                onClick={() =>
                                  updateModifiedGpuListItem(
                                    gpu.id,
                                    gpu.flightSheetId !== itemId ? itemId : null
                                  )
                                }
                              >
                                <div
                                  className={
                                    styles['gpu-list-modal__gpu-item-index']
                                  }
                                >
                                  {gpu.id}
                                </div>
                                <div
                                  className={
                                    styles['gpu-list-modal__gpu-item-name']
                                  }
                                >
                                  {gpu.name}
                                </div>
                                <FCheckbox
                                  className={
                                    styles['gpu-list-modal__gpu-item-checkbox']
                                  }
                                  value={gpu.flightSheetId === itemId}
                                />
                              </div>
                            ))}
                          </>
                        );
                      })()}
                  </Scrollbars>
                )}
              </>
            ),
        }[gpuListQuery.status]()}
      </FContainer>
      <div className={styles['gpu-list-modal__buttons']}>
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
  );
}
