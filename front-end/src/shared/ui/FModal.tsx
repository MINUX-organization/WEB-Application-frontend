import { HTMLProps, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import st from './FModal.module.scss';
import clsx from 'clsx';

type FModaProps = PropsWithChildren & {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  bodyProps?: HTMLProps<HTMLDivElement>;
  isBlack?: boolean;
};

export const FModal = ({
  isOpen,
  title,
  onClose,
  bodyProps,
  isBlack,
  children,
}: FModaProps) => {
  return createPortal(
    <div
      className={clsx(st['fmodal'], {
        [st['fmodal--open']]: isOpen,
        [st['fmodal--black']]: isBlack
      })}
      onMouseDown={(e) => (e.target === e.currentTarget ? onClose() : null)}
    >
      <div className={st['fmodal__content']}>
        <div className={st['fmodal__header']}>
          <div className={st['fmodal__header-side-lines']} />
          <div className={st['fmodal__header-left-filler']} />
          <div className={st['fmodal__header-text']}>{title}</div>
          <AiOutlineClose className={st['fmodal__header-icon']} onClick={onClose} />
        </div>
        {isOpen && (
          <div
            {...bodyProps}
            className={clsx(bodyProps?.className, st['fmodal__body'])}
          >
            {children}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
