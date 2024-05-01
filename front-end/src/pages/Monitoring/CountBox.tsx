import  { CSSProperties, ReactNode } from 'react'
import st from './CountBox.module.scss';

type CountBoxProps = {
  label: string;
  value: ReactNode;
  frameColor?: string;
}

export default function CountBox({ label, value, frameColor }: CountBoxProps) {
  return (
    <div
      className={st['count-box']}
      style={{ '--frame-color': frameColor } as CSSProperties}
    >
      <div className={st['count-box__label']}>{label}</div>
      <div className={st['count-box__value']}>{value}</div>
    </div>
  );
}
