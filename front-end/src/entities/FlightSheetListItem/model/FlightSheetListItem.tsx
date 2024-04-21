import { TFlightSheetFilled } from "@/shared/types";
import NormalItem from "./NormalItem";
import CustomItem from "./CustomItem";
import CpuItem from "./CpuItem";

type FlightSheetListItemProps = {
  item: TFlightSheetFilled;
  onDelete: () => void;
  onUpdate: () => void
};

export const FlightSheetListItem = ({ item, onDelete, onUpdate }: FlightSheetListItemProps) => {

  return (
    <div>
      {
        {
          SIMPLE: () => item.type === 'SIMPLE' && (
            <NormalItem
              item={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ),
          CUSTOM: () => item.type === 'CUSTOM' && (
            <CustomItem
              item={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ),
          CPU: () => item.type === 'CPU' && (
            <CpuItem
              item={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          )
        }[item.type]()
      }
    </div>
  );
};
