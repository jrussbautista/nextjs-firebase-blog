const formatDate = (date) => {
  const newDate = typeof date === "number" ? new Date(date) : date.toDate();
  return newDate.toLocaleString();
};

export default formatDate;
