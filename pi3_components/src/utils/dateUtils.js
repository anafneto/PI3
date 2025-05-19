export const formatDate = (dateString) => {
  if (!dateString) return "";

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return the original string if invalid
    }

    return date.toLocaleDateString("pt-PT", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};
