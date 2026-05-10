export const getDateTime = (timeString: string): string => {
  try {
    const date = new Date(timeString)

    if (isNaN(date.getTime())) {
      return 'Invalid date-time';
    }

    return `${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`;
  } catch (error) {
    return 'Date error';
  }
}
