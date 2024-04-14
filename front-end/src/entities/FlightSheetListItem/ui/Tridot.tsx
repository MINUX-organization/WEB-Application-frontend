import { CSSProperties } from 'react'
import styles from './Tridot.module.scss';

type TridotProps = {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export default function Tridot({ className, style, onClick }: TridotProps) {
  return (
      <div
        className={(className ?? "") + " " + styles["tridot-button"]}
        style={style}
        onClick={onClick}
      >
        <div className={styles["dot"]} />
        <div className={styles["dot"]} />
        <div className={styles["dot"]} />
      </div>
    );
}
