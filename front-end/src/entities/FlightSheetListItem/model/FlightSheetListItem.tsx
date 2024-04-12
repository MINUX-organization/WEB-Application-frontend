import { TFlightSheetFilled } from "@/shared/types";
import { CSSProperties, HTMLProps, useEffect } from "react";
import { FButton, FCheckbox, FContainer, FModal } from "@/shared/ui";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { useBooleanUrl } from "@/shared/lib/useBooleanUrl";
import { useBoolean, useElementSize } from "usehooks-ts";
import { useQuery } from "react-query";
import { getGpusForFlightSheets, editGpusForFlightSheets } from "../api";
import { useStateObj } from "@/shared/lib";
import { Spin } from "antd";
import { toast } from "react-toastify";
import Scrollbars from "react-custom-scrollbars-2";
import styles from "./FlightSheetListItem.module.scss";
import _ from "lodash";
import { deleteFlightSheet } from "@/shared/api";

const omittedProps = ["item"];

type FlightSheetListItemProps = HTMLProps<HTMLDivElement> & {
  item: TFlightSheetFilled;
  onDelete?: () => void;
};

export const FlightSheetListItem = ({ item, onDelete, ...props }: FlightSheetListItemProps) => {
  const isExpanded = useBoolean(false);
  const isOpen = useBooleanUrl(
    "flight-sheet-open-" + item.id + "-" + item.name
  );
  const isUpdatingGPUList = useBoolean(false);
  const gpuListQuery = useQuery(
    ["load gpu for flight sheet"],
    () => getGpusForFlightSheets({}),
    { enabled: false, onError: (error: any) => toast.error(error.message) }
  );
  const modifiedGpuList = useStateObj<
    Exclude<typeof gpuListQuery.data, undefined>["data"]["gpusForFlightSheets"]
  >([]);
  const [extraDataRef, extraDataSize] = useElementSize();

  const action = {
    updateModifiedGpuListItem: (
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
              oldFlightSheetId !== item.id ? oldFlightSheetId : null;
          } else {
            found.flightSheetId = flightSheetId;
          }
        }
        return [...prev];
      });
    },
    resetGpuList: () => {
      if (gpuListQuery.data === undefined) {
        modifiedGpuList.setValue([]);
      } else {
        modifiedGpuList.setValue(
          _.cloneDeep(gpuListQuery.data.data.gpusForFlightSheets)
        );
      }
    },
    cancelGpuList: () => {
      action.resetGpuList();
      isOpen.setFalse();
    },
    updateFlightGPUList: () => {
      isUpdatingGPUList.setTrue();
      editGpusForFlightSheets({
        gpusForFlightSheets: modifiedGpuList.value.map((v) =>
          _.omit(v, "name", "connected")
        ),
      })
        .then((res) => {
          toast.info("updated gpus for flight sheets");
        })
        .catch((e) => {
          toast.info(e.message);
        })
        .finally(() => {
          isUpdatingGPUList.setFalse();
          isOpen.setFalse();
        });
    },
    delete: () => {
      if (window.confirm("are you sure you want to delete flight sheet?")) {
        deleteFlightSheet({
          id: item.id,
        })
          .then((res) => {
            toast.info("Flight sheet deleted");
            onDelete?.();
          })
          .catch((e) => {});
      }
    },
  };

  const Tridot = (props: HTMLProps<HTMLDivElement>) => (
    <div
      {...props}
      className={(props.className ?? "") + " " + styles["tridot-button"]}
      onClick={isOpen.setTrue}
    >
      <div className={styles["dot"]} />
      <div className={styles["dot"]} />
      <div className={styles["dot"]} />
    </div>
  );

  useEffect(() => {
    action.resetGpuList();
  }, [gpuListQuery.data]);

  useEffect(() => {
    if (isOpen.value) {
      gpuListQuery.refetch();
    }
  }, [isOpen.value]);

  return (
    <div
      {..._.omit(props, omittedProps)}
      className={
        (props.className ?? "") +
        " " +
        styles["wrapper"] +
        " " +
        (isExpanded.value ? styles["open"] : "")
      }
      style={{ "--inner-height": extraDataSize.height + "px" } as CSSProperties}
    >
      {
        {
          SIMPLE: () => item.type === 'SIMPLE' && (
            <>
              <FContainer
                visibility={{ l: false, t: false, r: false, b: false }}
                bodyProps={{ className: styles["container-body"] }}
                className={
                  styles["container"] + " " + styles["sp1"] + " " + styles["sp2"]
                }
              >
                <div className={styles['additional-arguments']}>
                  <span>
                    Additional arguments:
                  </span>{' '}
                  <span style={{ color: 'gray' }}>
                    {item.additionalString}
                  </span>
                </div>
                <div className={styles["common-data"]}>
                  <div className={styles["name"]}>
                    <span className="flex-grow">{item.name}</span>
                    <Tridot className={styles["tridot"]} />
                    <AiOutlineClose
                      onClick={action.delete}
                      className={styles["delete-button"]}
                    />
                  </div>
                  <div className={styles["fields"]}>
                    {[
                      { label: "Coin", value: item.cryptocurrency.name },
                      { label: "Wallet", value: item.wallet.name },
                      { label: "Pool", value: item.pool.host },
                      { label: "Miner", value: item.miner.name },
                    ].map((item) => (
                      <div key={item.label} className={styles["field"]}>
                        <div className={styles["label"]}>{item.label}</div>
                        <div className={styles["value"]}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <AiOutlineDown
                    className={styles["dropdown-icon"]}
                    onClick={isExpanded.toggle}
                  />
                </div>
                <div className={styles["extra-data-wrapper"]}>
                  <div ref={extraDataRef} className={styles["extra-data"]}>
                    <div className={styles["field"]}>
                      <div className={styles["label"]}>Wallet Address</div>
                      <div className={styles["value"]}>{item.wallet.address}</div>
                    </div>
                    <div className={styles["field"]}>
                      <div className={styles["label"]}>Pool Host</div>
                      <div className={styles["value"]}>{item.pool.host}</div>
                    </div>
                    <div className={styles["field"]}>
                      <div className={styles["label"]}>Algorithm</div>
                      <div className={styles["value"]}>{item.algorithm.name}</div>
                    </div>
                  </div>
                </div>
              </FContainer>
            </>
          ),
          CUSTOM: () => item.type === 'CUSTOM' && (
            <>
              <pre>
                {JSON.stringify(item)}
              </pre>
            </>
          ),
        }[item.type]()
      }
      <div className={styles["outside-buttons"]}>
        <AiOutlineClose
          onClick={action.delete}
          className={styles["delete-button"]}
        />
        <Tridot className={styles["tridot"]} />
      </div>
      <FModal
        title="Select GPU"
        open={isOpen.value}
        onClose={isOpen.setFalse}
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
                          action.updateModifiedGpuListItem(
                            gpu.id,
                            !(gpu.flightSheetId === item.id)
                              ? item.id
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
                          value={gpu.flightSheetId === item.id}
                        />
                      </div>
                    ))}
                  </>
                );
              })()}
          </Scrollbars>
        </FContainer>
        <div className={styles["modal-buttons"]}>
          <FButton severity="bad" onClick={action.cancelGpuList}>
            Cancel
          </FButton>
          <FButton
            loading={isUpdatingGPUList.value}
            severity="good"
            onClick={action.updateFlightGPUList}
          >
            Apply
          </FButton>
        </div>
      </FModal>
    </div>
  );
};
