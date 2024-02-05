export class DateFormatter {
  static ddMMyyyy(date: Date | string) {
    const newDate = typeof date === "string" ? new Date(date) : date;
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
}
