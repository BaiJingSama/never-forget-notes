export function friendlyDate(datsStr) {
  let dateObj = typeof datsStr === "object" ? datsStr : new Date(datsStr);
  let time = dateObj.getTime();
  let now = Date.now();
  let space = now - time;
  let str = "";

  switch (true) {
    case space < 60000:
      str = "1分钟内";
      break;
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + "分钟前";
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + "小时前";
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + "天前";
  }
  return str;
}
