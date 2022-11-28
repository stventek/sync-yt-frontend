export function getTimeString(dateString: string) {
  const date = new Date(dateString)
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return day + '/' + month + '/' + year;
}