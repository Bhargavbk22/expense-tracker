export const budgetValidation = {
  monthlyLimit: { required: true, type: "number", min: 0 },
  month: { required: true, type: "number", min: 1, max: 12 },
  year: { required: true, type: "number", min: 2000, max: 2100 }
};
