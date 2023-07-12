import { Input as BaseInput, InputProps } from "antd";
import React from "react";
import defaultStyles from "./styles/default.module.scss";
import passwordStyle from "./styles/password.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { typeInput } from "../../constants/Input";

export interface CustomInputProps extends InputProps {
  type?: "inputDefault" | "inputPhone" | "inputPassword";
  onChange?: () => void;
  placeholder?: string;
  label?: string;
}

interface Dictionary {
  [key: string]: any;
}

const inputStyleDictionary: Dictionary = {
  inputDefault: defaultStyles,
  inputPassword: passwordStyle,
};

const INPUT_PHONE_STYLE: React.CSSProperties = {
  width: "100%",
  height: 48,
  borderRadius: 12,
  borderColor: "#D9D9D9",
};
const BUTTON_INPUT_PHONE_STYLE: React.CSSProperties = {
  margin: 5,
  backgroundColor: "#E6E8F1",
  border: 0,
  borderRadius: 8,
};

export const Input: React.FC<CustomInputProps> = (props) => {
  const {
    type = "inputDefault",
    onChange,
    placeholder,
    label,
    ...restProps
  } = props;

  if (!typeInput.includes(type)) {
    return (
      <div className={defaultStyles.inputContainer}>
        <label>{label}</label>
        <BaseInput
          className={defaultStyles.input}
          {...restProps}
          placeholder={placeholder}
          onChange={onChange}
          data-testid="input"
        />
      </div>
    );
  } else if (type === "inputPhone") {
    return (
      <div className={defaultStyles.inputContainer}>
        <label>{label}</label>
        <PhoneInput
          country={"ru"}
          placeholder={placeholder}
          onChange={onChange}
          buttonStyle={BUTTON_INPUT_PHONE_STYLE}
          inputStyle={INPUT_PHONE_STYLE}
        />
      </div>
    );
  } else {
    return (
      <div className={defaultStyles.inputContainer}>
        <label>{label}</label>
        <BaseInput.Password
          className={inputStyleDictionary[type]?.input}
          {...restProps}
          placeholder={placeholder}
          onChange={onChange}
          data-testid="input"
        />
      </div>
    );
  }
};
