import { AiOutlineClose } from 'react-icons/ai';
import styles from './ItemButtons.module.scss'
import Tridot from './Tridot';

type ItemButtonsProps = {
  direction: 'vertical' | 'horizontal';
  onDeleteClick: () => void;
  onTridotClick: () => void;
};

export default function ItemButtons({
  direction,
  onDeleteClick,
  onTridotClick,
}: ItemButtonsProps) {
  return (
    <div className={styles['main'] + ' ' + direction}>
      <Tridot onClick={onTridotClick} />
      <AiOutlineClose
        onClick={onDeleteClick}
        className={styles['delete-button']}
      />
    </div>
  )
}
