import { TFlightSheetFilled } from "@/shared/types";
import { FContainer } from "@/shared/ui";
import styles from './CustomItem.module.scss';

type CustomItemProps = {
  item: Extract<TFlightSheetFilled, { type: 'custom' }>;
  onDelete: () => void;
  onUpdate: () => void
}

export default function CustomItem({ item, onDelete, onUpdate }: CustomItemProps) {
  return (
    <FContainer
      visibility={{ l: false, t: false, r: false, b: false }}
      bodyProps={{ className: styles['container-body'] }}
      className={
        styles['container'] + ' ' + styles['sp1'] + ' ' + styles['sp2']
      }
    >
      <div className="text-3xl mb-4">
        {item.name}
      </div>
      <div className={styles['additional-arguments']}>
        <span>Additional arguments:</span>{' '}
        <span style={{ color: 'gray' }}>{item.extraConfigArguments}</span>
      </div>
    </FContainer>
  )
}
