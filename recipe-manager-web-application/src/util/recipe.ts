export function minutesToTimeString(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

export function timeStringToMinutes(timeString: string) {
  if (timeString.length !== 5) {
    return 0;
  }

  const hours = parseInt(timeString.slice(0, 2));
  const minutes = parseInt(timeString.slice(3, 5));
  if (isNaN(hours) || isNaN(minutes)) {
    return 0;
  }

  return hours * 60 + minutes;
}
