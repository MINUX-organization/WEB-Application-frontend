import { TFlightSheetFilled } from "@/shared/types";
import { FContainer, FModal } from "@/shared/ui";
import { AiOutlineDown } from "react-icons/ai";
import { useBoolean, useElementSize } from "usehooks-ts";
import { CSSProperties } from "react";
import { toast } from "react-toastify";
import { editGpusForFlightSheetsWithCustomMiner } from "@/shared/api/editGpusForFlightSheetsWithCustomMiner";
import { Spin } from "antd";
import { deleteFlightSheetWithCustomMiner } from "@/shared/api/deleteFlightSheetWithCustomMiner";
import ItemButtons from "../ui/Itembuttons";
import styles from './CustomItem.module.scss';
import { FlightSheetWithCustomMinerForm } from "@/features/FlightSheetWithCustomMinerForm";

type CustomItemProps = {
  item: Extract<TFlightSheetFilled, { type: 'CUSTOM' }>;
  onDelete: () => void;
  onUpdate: () => void
}

export default function CustomItem({ item, onDelete, onUpdate }: CustomItemProps) {
  const isExpanded = useBoolean(false);
  const isApplying = useBoolean(false);
  const isEditing = useBoolean(false);
  const [extraDataRef, extraDataSize] = useElementSize();

  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete flight sheet?")) {
      deleteFlightSheetWithCustomMiner({
        id: item.id,
      })
      .then((res) => {
        toast.info("Flight sheet deleted");
        onDelete();
      })
      .catch((e) => {});
    }
  }

  const handleApplyCustomMiner = () => {
    if (window.confirm(
      "Are you sure you want to apply custom miner? All you GPUs' settings will be deleted." +
      "Your mining rig is going to mine on custom miner"
    )) {
      isApplying.setTrue();
      editGpusForFlightSheetsWithCustomMiner({
        flightSheetWithCustomMinerId: item.id
      })
      .then((res) => {
        toast.info("Flight sheet with custom miner applied")
      })
      .catch((e) => {
        toast.error("Cannot apply flight sheet with custom miner")
      })
      .finally(() => {
        isApplying.setFalse()
      })
    }
  }

  return (
    <div
      className={styles['wrapper'] + ' ' + (isExpanded.value ? styles["open"] : "")}
      style={{ "--inner-height": extraDataSize.height + "px" } as CSSProperties}
    >
      <FContainer
        visibility={{ l: false, t: false, r: false, b: false }}
        bodyProps={{ className: styles['container-body'] }}
        className={
          styles['container'] + ' ' + styles['sp1'] + ' ' + styles['sp2']
        }
      >
        <div className="flex gap-4 mb-4 items-center">
          <div className="text-3xl flex-grow">
            {item.name}
          </div>
          <div className="text-gray-500">
            CUSTOM
          </div>
          {isApplying.value && <Spin />}
          <div className={styles['inner-buttons']}>
            <ItemButtons
              direction='horizontal'
              onDeleteClick={handleDelete}
              onTridotClick={handleApplyCustomMiner}
              onEditClick={isEditing.setTrue}
            />
          </div>
        </div>
        <div className={styles['additional-arguments']}>
          <span>Additional arguments:</span>{' '}
          <span style={{ color: 'gray' }}>{item.extraConfigArguments}</span>
        </div>
        <div className="flex items-center">
          <div className={styles['fields']}>
            <div className={styles['field']}>
              <div className={styles['label']}>
                Coin
              </div>
              <div className={styles['value']}>
                {item.coin}
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>
                Wallet
              </div>
              <div className={styles['value']}>
                {item.wallet}
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>
                Pool
              </div>
              <div className={styles['value']}>
                {item.poolURL}
              </div>
            </div>
          </div>
          <AiOutlineDown
            className={styles['dropdown-icon']}
            onClick={isExpanded.toggle}
          />
        </div>
        <div className={styles['extra-data-wrapper']}>
          <div ref={extraDataRef} className={styles['extra-data']}>
            <div className={styles['field'] + ' ' + 'justify-self-start items-start'}>
              <div className={styles['label']}>
                InstallationURI
              </div>
              <div className={styles['value']}>
                {item.installationURL}
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>
                Algorithm
              </div>
              <div className={styles['value']}>
                {item.algorithm}
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>
                Pool template
              </div>
              <div className={styles['value']}>
                {item.poolTemplate}
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>
                Wallet and worker template
              </div>
              <div className={styles['value']}>
                {item.walletAndWorkerTemplate}
              </div>
            </div>
            <div className={styles['field']  + ' ' + 'justify-self-end items-end'}>
              <div className={styles['label']}>
                Password
              </div>
              <div className={styles['value']}>
                {item.password}
              </div>
            </div>
          </div>
        </div>
      </FContainer>
      <div className={styles['outside-buttons']}>
        <ItemButtons
          direction="vertical"
          onDeleteClick={handleDelete}
          onTridotClick={handleApplyCustomMiner}
          onEditClick={isEditing.setTrue}
        />
      </div>
      <FModal title="Edit flight sheet with custom miner" isOpen={isEditing.value} onClose={isEditing.setFalse}>
        <div className="bg-black p-8">
          <FlightSheetWithCustomMinerForm flightSheet={item} onSubmit={onUpdate} />
        </div>
      </FModal>
    </div>
  )
}
