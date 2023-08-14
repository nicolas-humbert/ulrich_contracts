import type { SelectProps } from "react-aria-components";
import {
  Button,
  Label,
  ListBox,
  Popover,
  Select,
  SelectValue,
  Text,
} from "react-aria-components";
import "../styles/c-select-field.scss";

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function CSelectField<T extends object>({
  label,
  description,
  errorMessage,
  children,
  ...props
}: MySelectProps<T>) {
  return (
    <div className="c-select-field">
      <Select {...props}>
        <Label>{label}</Label>
        <Button>
          <span aria-hidden="true">▼</span>
          <SelectValue />
        </Button>
        {description && <Text slot="description">{description}</Text>}
        {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
        <Popover>
          <ListBox>{children}</ListBox>
        </Popover>
      </Select>
    </div>
  );
}

export default CSelectField;
