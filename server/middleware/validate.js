export const validate = (schema) => (req, _res, next) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.body[field];
    const isEmpty = value === undefined || value === null || value === "";

    if (rules.required && isEmpty) {
      errors.push(`${field} is required`);
      continue;
    }

    if (!isEmpty && rules.type === "number" && Number.isNaN(Number(value))) {
      errors.push(`${field} must be a number`);
    }

    if (!isEmpty && rules.min !== undefined && Number(value) < rules.min) {
      errors.push(`${field} must be at least ${rules.min}`);
    }

    if (!isEmpty && rules.max !== undefined && Number(value) > rules.max) {
      errors.push(`${field} must be at most ${rules.max}`);
    }

    if (!isEmpty && rules.enum && !rules.enum.includes(value)) {
      errors.push(`${field} must be one of: ${rules.enum.join(", ")}`);
    }
  }

  if (errors.length) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.errors = errors;
    return next(error);
  }

  next();
};
