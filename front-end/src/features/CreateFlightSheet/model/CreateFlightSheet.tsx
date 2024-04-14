import { CreateFlightSheetNormal } from "@/features/CreateFlightSheetNormal";
import { CreateFlightSheetWithCustomMiner } from "@/features/CreateFlightSheetWithCustomMiner";
import { FDropdown, FQuadCornerContainer } from "@/shared/ui";
import { useState } from "react";
import styles from './CreateFlightSheet.module.scss';

type TTypeOption = "normal" | "custom";
const typeOptions: TTypeOption[] = ["normal", "custom"];

type TCreateFlightSheetProps = {
  onAdd: () => void;
};

export function CreateFlightSheet({ onAdd }: TCreateFlightSheetProps) {
  const [type, setType] = useState<TTypeOption>("normal");

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
            normal: <CreateFlightSheetNormal onAdd={onAdd} />,
            custom: (
              <CreateFlightSheetWithCustomMiner
                onAdd={onAdd}
              />
            ),
          }[type]
        }
      </FQuadCornerContainer>
    </div>
  );
}
