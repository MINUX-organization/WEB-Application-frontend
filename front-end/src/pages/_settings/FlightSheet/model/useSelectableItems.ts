import { useState, useCallback } from "react";

type ItemType = {};

export function useSelectableItems(initialItems: ItemType[] = []): {
  selectedItems: ItemType[];
  toggleSelectItem: (item: ItemType) => void;
} {
  const [selectedItems, setSelectedItems] = useState<ItemType[]>(initialItems);

  const toggleSelectItem = useCallback((item: ItemType) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  }, []);

  return { selectedItems, toggleSelectItem };
}
