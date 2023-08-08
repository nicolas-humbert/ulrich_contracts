import type { TextFieldProps } from "react-aria-components";
import { Input, Label, Text, TextField } from "react-aria-components";
import "../styles/c-input-fields.scss";

interface CTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
}

const CTextField = ({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: CTextFieldProps) => {
  return (
    <TextField {...props} className="c-input-field">
      <Label>{label}</Label>
      <Input placeholder={placeholder} />
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </TextField>
  );
};
export default CTextField;
