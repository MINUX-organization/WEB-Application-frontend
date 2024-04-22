import { HTMLProps } from "react";
import { CreateFlightSheet } from "@/features/CreateFlightSheet";
import { FlightSheetListItem } from "@/entities/FlightSheetListItem";
import { useQuery } from "react-query";
import { getFullFilledFlightSheets } from "../api";
import { Spin } from "antd";
import { toast } from "react-toastify";
import styles from "./FlightSheet.module.scss";
import { FButton } from "@/shared/ui";
import { resetCpuSettings } from "@/shared/api/resetCpuSettings";
import { resetGpuSettings } from "@/shared/api/resetGpuSettings";

export const FlightSheet = (props: HTMLProps<HTMLDivElement>) => {
  const flightSheetListQuery = useQuery(
    ["load flight sheet list"],
    () => getFullFilledFlightSheets({}),
    { onError: (error: any) => toast(error.message) }
  );

  const handleResetCpu = () => {
    resetCpuSettings({})
      .then(() => toast.info('All CPU settings are reset'))
      .catch((error) => toast.error(error.message))
  }

  const handleResetGpu = () => {
    resetGpuSettings({})
    .then(() => toast.info('All GPU settings are reset'))
    .catch((error) => toast.error(error.message))
  }

  return (
    <div
      {...props}
      className={(props.className ?? "") + " " + styles["wrapper"]}
    >
      <CreateFlightSheet onAdd={flightSheetListQuery.refetch} />
      <div className="flex gap-4 justify-end">
        <FButton severity="bad" onClick={handleResetGpu}>Reset GPU settings</FButton>
        <FButton severity="bad" onClick={handleResetCpu}>Reset CPU settings</FButton>
      </div>
      <div className={styles["list"]}>
        {flightSheetListQuery.isFetching && (
          <div className="w-full flex justify-center">
            <Spin size="large" />
          </div>
        )}
        {!flightSheetListQuery.isFetching &&
          flightSheetListQuery.data !== undefined &&
          flightSheetListQuery.data.data.flightSheets.map((item) => (
            <FlightSheetListItem
              key={item.id}
              item={item}
              onDelete={flightSheetListQuery.refetch}
              onUpdate={flightSheetListQuery.refetch}
            />
          ))}
      </div>
    </div>
  );
};
