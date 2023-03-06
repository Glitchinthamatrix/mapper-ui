import { isObject, getFieldValue } from "./object";
import { isUploadFileInfo } from "./naive-ui";

export default {
  isNestedFormObject(value) {
    return isObject(value) && !isUploadFileInfo(value);
  },

  initErrors(form, fieldErrors) {
    for (let field in form) {
      fieldErrors[field] = {};
      if (this.isNestedFormObject(form[field])) {
        this.initErrors(form[field], fieldErrors[field]);
      } else {
        this.resetError(fieldErrors[field]);
      }
    }
  },

  setValidationErrors(form, fieldErrors, errors) {
    this.resetErrors(form, fieldErrors);
    for (let error of errors) {
      error = error[0];
      const fieldError = getFieldValue(fieldErrors, error.field);
      fieldError.hasError = true;
    }
  },

  setErrors(form, fieldErrors, errors) {
    for (let field in fieldErrors) {
      if (errors) {
        if (this.isNestedFormObject(form[field])) {
          this.setErrors(form[field], fieldErrors[field], errors[field]);
        } else if (errors[field]) {
          fieldErrors[field].hasError = true;
          fieldErrors[field].validationStatus = "error";
          fieldErrors[field].feedback = errors[field][0];
        }
      } else {
        this.resetError(fieldErrors[field]);
      }
    }
  },

  resetErrors(form, fieldErrors) {
    for (let field in fieldErrors) {
      if (this.isNestedFormObject(form[field])) {
        this.resetErrors(form[field], fieldErrors[field]);
      } else {
        this.resetError(fieldErrors[field]);
      }
    }
  },

  resetError(fieldError) {
    fieldError.validationStatus = undefined;
    fieldError.feedback = undefined;
    fieldError.hasError = false;
  },
};
