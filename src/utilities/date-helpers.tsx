export function getTimeString(dateString: string) {
  const date = new Date(dateString)
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();

  return day + '/' + month + '/' + year;
}
