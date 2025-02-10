export function formatDate(date: string, withTime: boolean): string {
  if (withTime) {
    const formattedDate = new Date(date).toLocaleDateString("ru-RU");
    const formattedTime = new Date(date).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate}, ${formattedTime}`;
  }

  return new Date(date).toLocaleDateString("ru-RU");
}
