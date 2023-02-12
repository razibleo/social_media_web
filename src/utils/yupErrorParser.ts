import { ValidationError } from "yup";

const parseYupError = (validationError: ValidationError) => {
  const result: Map<string, Array<string>> = new Map();
  console.log(validationError.inner);

  for (let i = 0; i < validationError.inner.length; i++) {
    const e = validationError.inner[i];
    if (!e.path) continue;

    const errors = result.get(e.path);
    if (errors) {
      result.set(e.path, [...errors, ...e.errors]);
    } else {
      result.set(e.path, [...e.errors]);
    }
  }

  return result;
};

export default parseYupError;
