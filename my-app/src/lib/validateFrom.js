const customValidation = {
  email: {
    required: true,
    minLength: 3,
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
  firstname:{
    required: true,
    minLength: 3,
  },
};
function validate(key, value, warnings) {
  if (!customValidation[key]) return;

  const validationRules = customValidation[key];
  warnings[key] = [];

  if (validationRules.required && !value) {
    warnings[key].push("required");
  }
  if (validationRules.minLength && value.length < validationRules.minLength) {
    warnings[key].push(`${key =="firstname" ? "first name" : key } must be >= ${validationRules.minLength} characters`);
  }
  if (validationRules.regex && !validationRules.regex.test(value)) {
    warnings[key].push(`${key} is not in valid format`);
  }
}

export const validateFrom = (info, setWarning) => {
  const warnings = {};
  Object.keys(info).forEach((key) => {
    validate(key, info[key], warnings);
  });

  setWarning(()=>warnings);

  const hasWarnings = Object.keys(warnings).some(
    (key) => warnings[key].length > 0
  );

  return !hasWarnings;
};
