import { TFlightSheetFilled } from "@/shared/types";
import NormalItem from "./NormalItem";
import CustomItem from "./CustomItem";

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
          normal: () => item.type === 'normal' && (
            <NormalItem
              item={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ),
          custom: () => item.type === 'custom' && (
            <CustomItem
              item={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ),
        }[item.type]()
      }
    </div>
  );
};
