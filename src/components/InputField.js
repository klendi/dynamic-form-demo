import React from "react";
import { Form, Col } from "react-bootstrap";

const InputField = ({
  type,
  label,
  placeholder,
  name,
  options = [],
  value,
  error,
  handleChange,
  readOnly,
  multiple,
  defaultValue,
  info
}) => {
  const renderSelect = () => {
    if (type === "select") {
      return (
        <>
          <option key={1} value="">
            Chose an option
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </>
      );
    }
  };

  let propss = {
    type,
    name,
    placeholder,
    value,
    onChange: handleChange,
    isInvalid: !!error,
    multiple,
    defaultValue,
    readOnly
  };

  if (type === "select") {
    propss.as = "select";
  } else if (type === "textarea") {
    propss.as = "textarea";
  }
  return (
    <Form.Row>
      <Form.Group as={Col} md="12" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...propss}>{renderSelect()}</Form.Control>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        {info && <Form.Text className="text-muted">{info}</Form.Text>}
      </Form.Group>
    </Form.Row>
  );
};

export default InputField;
