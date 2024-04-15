import { FDropdown, FQuadCornerContainer } from "@/shared/ui";
import { useState } from "react";
import styles from './CreateFlightSheet.module.scss';
import { FlightSheetSimpleForm } from "@/features/FlightSheetSimpleForm";
import { FlightSheetWithCustomMinerForm } from "@/features/FlightSheetWithCustomMinerForm";

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
            CUSTOM: <FlightSheetWithCustomMinerForm onSubmit={onAdd} />,
          }[type]
        }
      </FQuadCornerContainer>
    </div>
  );
}
