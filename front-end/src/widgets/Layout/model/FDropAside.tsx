import { useState, useRef, HTMLProps, useEffect } from "react";
import styles from './FDropAside.module.scss'

type FDropAsideProps = { 
    fields: {label: string, onSelect: () => void}[]
    position: 'left' | 'right' 
} & HTMLProps<HTMLDivElement>

export const FDropAside = ( {fields, ...props}: FDropAsideProps) => { 

  return ( 
    <div {...props} className={styles['wrapper'] + ' ' + styles[props.position]}> 
        <ul className={styles['field-data']}>
          {fields.map((field) => (
            <li
              className={styles['data']}
              key={field.label}
              onClick={field.onSelect}
            > 
            {field.label}
            </li>
          ))}
        </ul> 
    </div>
  );
}; 
