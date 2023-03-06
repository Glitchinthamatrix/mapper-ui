const DATA_TYPE_OBJECT = "object";

export function isObject(value) {
  return (
    value !== null && typeof value === DATA_TYPE_OBJECT && !Array.isArray(value)
  );
}
export function getFieldValue(object, field) {
  let value;
  if (field.includes(".")) {
    const fields = field.split(".");
    for (const fieldName of fields) {
      if (fieldName === fields[fields.length - 1]) {
        value = object[fieldName];
      } else if (!(fieldName in object)) {
        object[fieldName] = {};
      }
      object = object[fieldName];
    }
  } else {
    value = object[field];
  }
  return value;
}
