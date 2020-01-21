import * as yup from "yup";

export function createYupSchema(schema, config) {
  if (!config) {
    return;
  }
  const { name, rules } = config;
  const validations = parseValidationString(rules);

  const validationType = "string";

  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
}

function parseValidationString(string) {
  const strings = string.split("|");
  let validationArray = [];
  strings.map(str => {
    switch (str) {
      case "required":
        validationArray.push({
          type: "required",
          params: ["This field is required"]
        });
        break;
      case str.startsWith("min") ? str : "":
        const min = parseInt(str.split(":")[1]);
        validationArray.push({
          type: "min",
          params: [min, `This field must have more than ${min} characters`]
        });
        break;
      case str.startsWith("max") ? str : "":
        const max = parseInt(str.split(":")[1]);

        validationArray.push({
          type: "max",
          params: [max, `This field must not have more than ${max} characters`]
        });

      default:
        break;
    }
  });

  return validationArray;
}
