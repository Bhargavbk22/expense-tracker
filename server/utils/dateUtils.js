export const getMonthRange = (month, year) => {
  const now = new Date();
  const targetMonth = Number(month || now.getMonth() + 1);
  const targetYear = Number(year || now.getFullYear());
  const start = new Date(targetYear, targetMonth - 1, 1);
  const end = new Date(targetYear, targetMonth, 1);
  return { month: targetMonth, year: targetYear, start, end };
};

export const getPreviousMonth = (month, year) => {
  const date = new Date(Number(year), Number(month) - 2, 1);
  return { month: date.getMonth() + 1, year: date.getFullYear() };
};
