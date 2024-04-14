import { CreateFlightSheetNormal } from "@/features/CreateFlightSheetNormal";
import { CreateFlightSheetWithCustomMiner } from "@/features/CreateFlightSheetWithCustomMiner";
import { FDropdown, FQuadCornerContainer } from "@/shared/ui";
import { useState } from "react";
import styles from './CreateFlightSheet.module.scss';
import { FlightSheetSimpleForm } from "@/features/FlightSheetSimpleForm";

type TTypeOption = "SIMPLE" | "CUSTOM";
const typeOptions: TTypeOption[] = ["SIMPLE", "CUSTOM"];

type TCreateFlightSheetProps = {
  onAdd: () => void;
};

export function CreateFlightSheet({ onAdd }: TCreateFlightSheetProps) {
  const [type, setType] = useState<TTypeOption>("SIMPLE");

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
            SIMPLE: <FlightSheetSimpleForm onSubmit={onAdd} />,
            CUSTOM: (
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
