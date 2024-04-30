import { FDropdown, FQuadCornerContainer } from '@/shared/ui';
import { useState } from 'react';
import { FlightSheetGpuSingleForm } from '@/features/FlightSheetGpuSingleForm';
import { FlightSheetWithCustomMinerForm } from '@/features/FlightSheetWithCustomMinerForm';
import { FlightSheetCpuForm } from '@/features/FlightSheetCpuForm';
import styles from './CreateFlightSheet.module.scss';
import { FlightSheetGpuMultipleForm } from '@/features/FlightSheetGpuMultipleForm';

type TTypeOption = 'GPU-SINGLE' | 'GPU-MULTIPLE' | 'CUSTOM' | 'CPU';
const typeOptions: TTypeOption[] = ['GPU-SINGLE', 'GPU-MULTIPLE', 'CUSTOM', 'CPU'];

type TCreateFlightSheetProps = {
  onAdd: () => void;
};

export function CreateFlightSheet({ onAdd }: TCreateFlightSheetProps) {
  const [type, setType] = useState<TTypeOption>('GPU-SINGLE');

  return (
    <div>
      <FDropdown
        className="mb-4"
        options={typeOptions}
        getOptionLabel={(item) => item}
        getOptionValue={(item) => item}
        value={type}
        onChange={(newType) => {
          if (newType) {
            setType(newType);
          }
        }}
      />

      <FQuadCornerContainer className={styles['box']}>
        {
          {
            "GPU-SINGLE": <FlightSheetGpuSingleForm onSubmit={onAdd} />,
            "GPU-MULTIPLE": <FlightSheetGpuMultipleForm onSubmit={onAdd} />,
            CUSTOM: <FlightSheetWithCustomMinerForm onSubmit={onAdd} />,
            CPU: <FlightSheetCpuForm onSubmit={onAdd} />,
          }[type]
        }
      </FQuadCornerContainer>
    </div>
  );
}
