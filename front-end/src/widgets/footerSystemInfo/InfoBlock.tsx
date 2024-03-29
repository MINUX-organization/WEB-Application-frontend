import { valueOrNA } from "@/shared/utils";
import { Spin } from "antd";
import styles from './InfoBlock.module.scss'
import { useId } from "react";
import React from "react";

type Props = {
  labels: string[];
  values: any[];
  isFetching?: boolean;
};

export const InfoBlock = ({ labels, values, isFetching }: Props) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
    {labels.map((label, idx) => (
      <React.Fragment key={idx + id}>
        <div className={styles['label-data']}>{label}</div>
        <div className={styles['value-data']}>
          {isFetching ? <Spin size='default' /> : valueOrNA(values[idx])}
        </div>
      </React.Fragment>
    ))}
    </div>
  );
};