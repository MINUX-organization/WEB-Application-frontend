import useAddModal from '../hooks/useAddModal'
import { FContainer, FDropdown, FModal } from '@/shared/ui'
import styles from './Field.module.scss';

type TFieldProps<T> = {
  label: string
  isOptionsLoading: boolean
  options: Array<T>
  getOptionLabel: (item: T) => string
  getKey: (item: T) => string
  placeholder: string
  value: T | null
  onChange: (value: T | null) => void
  modalOpenState: ReturnType<typeof useAddModal>;
  refetchOptions: () => void
  disableAddButton?: boolean
}

export default function Field<T>({
  label,
  isOptionsLoading,
  options,
  getOptionLabel,
  getKey,
  placeholder,
  value,
  onChange,
  modalOpenState,
  refetchOptions,
  disableAddButton = false
}: TFieldProps<T>) {
  return (
    <div key={label} className={styles["field"]}>
      <div className={styles["field-header"]}>
        <div className={styles["field-label"]}>{label}</div>
        {!disableAddButton &&
          <div
            className={styles["field-add-button"]}
            onClick={modalOpenState.isOpen.setTrue}
          >
            Add
          </div>
        }
      </div>
      <FDropdown
        warnWhenNoOptions
        loading={isOptionsLoading}
        options={options}
        value={value}
        getOptionLabel={getOptionLabel}
        getOptionValue={getKey}
        placeholder={placeholder}
        onChange={(value) => onChange(value)}
      />
      <FModal
        title={modalOpenState.title}
        isOpen={modalOpenState.isOpen.value}
        onClose={modalOpenState.isOpen.setFalse}
      >
        <FContainer
          visibility={{ tc: false }}
          bodyProps={{ className: styles["modal-body"] }}
        >
          <modalOpenState.ModalBody
            onAdd={() => {
              modalOpenState.isOpen.setFalse();
              refetchOptions();
            }}
          />
        </FContainer>
      </FModal>
    </div>
  )
}
