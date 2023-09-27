import { valueOrNA } from "@shared/utils";
import { Spin } from "antd";
import styles from './InfoBlock.module.scss'
import { useId } from "react";

type Props = {
    labels: string[],
    values: any[]
    isFetching?: boolean
}

export const InfoBlock = ({ labels, values, isFetching }: Props) => {
  const id = useId();

    return (
      <div className={styles['wrapper']}>
        <div className={styles['label-data']}>
          {labels.map((label, idx) => (
            <p key={idx + id}>{label}</p>
          ))}
        </div>
        <div className={styles['value-data']}>
          {values.map((value, idx) => (
            <div key={idx + id}>{isFetching ? <Spin size="default"/> : valueOrNA(value)}</div>
          ))}
        </div>
      </div>
    );
  };