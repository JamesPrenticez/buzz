import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export function formatDate(datetimeString: string): string {
  // Parse the datetime string
  const dt = new Date(datetimeString);

  // Get month name and year
  const monthName = dt.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const year = dt.getFullYear();

  return `${capitalizeFirstLetter(monthName)} ${year}`;
}
