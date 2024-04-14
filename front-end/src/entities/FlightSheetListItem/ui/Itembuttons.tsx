import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import styles from './ItemButtons.module.scss'
import Tridot from './Tridot';

type ItemButtonsProps = {
  direction: 'vertical' | 'horizontal';
  onDeleteClick: () => void;
  onTridotClick: () => void;
  onEditClick?: () => void;
};

export default function ItemButtons({
  direction,
  onDeleteClick,
  onTridotClick,
  onEditClick
}: ItemButtonsProps) {
  return (
    <div className={styles['main'] + ' ' + direction}>
      {onEditClick && (
        <AiOutlineEdit
          onClick={onEditClick}
          className={styles['edit-button']}
        />
      )}
      <Tridot
        onClick={onTridotClick}
        className={styles['tridot-button']}
      />
      <AiOutlineClose
        onClick={onDeleteClick}
        className={styles['delete-button']}
      />
    </div>
  )
}
