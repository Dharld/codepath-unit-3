/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState, forwardRef } from "react";
import exclamationIcon from "../../assets/icons/exclamation-red.png";
import "./input.component.scss";

const Input = forwardRef(
  (
    {
      label,
      sublabel,
      name = "",
      type = "text",
      value = "",
      handleChange,
      validation,
      onBlur,
      placeholder,
      showErrorMessage = true,
      textAlignCenter = false,
      state,
    },
    ref
  ) => {
    const [isEmpty, setIsEmpty] = useState(value === "");
    const [error, setError] = useState(false);

    useEffect(() => {
      setIsEmpty(value === "");
    }, [value]);

    const handleBlur = (e) => {
      if (validation && !validation.test(e.target.value)) {
        setError(true);
      } else {
        setError(false);
      }
      onBlur && onBlur(e);
    };

    const onChange = (e) => {
      if (validation && !validation.test(e.target.value)) {
        setError(true);
      } else {
        setError(false);
      }
      handleChange && handleChange(e);
    };

    return (
      <div className="input-wrapper">
        {label && (
          <div htmlFor={name} className="label">
            {label}
          </div>
        )}
        {sublabel && (
          <div htmlFor={name} className="sublabel">
            {sublabel}
          </div>
        )}
        <div
          className={`input ${isEmpty ? "" : "not-empty"} ${
            state === "error" ? "has-error" : ""
          }`}
        >
          <input
            type={type}
            name={name}
            key={name}
            id={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${textAlignCenter ? "center" : ""}`}
            ref={ref}
          />
        </div>
        {error && showErrorMessage !== false && (
          <div className="error">
            <img src={exclamationIcon} className="error-img" alt="" />
            <div>{validation.errorMessage}</div>
          </div>
        )}
      </div>
    );
  }
);

export default Input;
