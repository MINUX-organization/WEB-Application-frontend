import { useBooleanUrl } from "@/shared/lib/useBooleanUrl";
import { HTMLProps } from "react";

const useAddModal = (
  title: string,
  booleanUrlKey: string,
  ModalBody: (
    props: HTMLProps<HTMLDivElement> & { onAdd?: () => void }
  ) => JSX.Element
) => {
  return {
    title,
    isOpen: useBooleanUrl(booleanUrlKey),
    ModalBody,
  };
};

export default useAddModal;
