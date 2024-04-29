import { TFlightSheetFilled } from "@/shared/types";
import GpuItem from "./GpuItem";
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
          "GPU-SINGLE": () => item.type === 'GPU-SINGLE' && (
            <GpuItem
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
