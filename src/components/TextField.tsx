import React from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";

function TextField(props: AriaTextFieldProps) {
  const { label } = props;
  const ref = React.useRef(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div
      className="input-bloc"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default TextField;
