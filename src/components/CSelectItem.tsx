import { Item, ItemProps } from "react-aria-components";
import "../styles/c-select-field.scss";

const CSelectItem = (props: ItemProps) => {
  return (
    <Item
      {...props}
      className={({ isFocused, isSelected }) =>
        `c-item ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
};

export default CSelectItem;
