function formatDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Get the desired parts of the date and format them appropriately
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the output string
  return `${hours}:${minutes} - ${dayOfWeek} ${month} ${day}, ${year}`;
}

// Usage example

export { formatDate };
