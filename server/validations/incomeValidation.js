export const incomeValidation = {
  source: { required: true },
  amount: { required: true, type: "number", min: 0 },
  date: { required: true }
};
