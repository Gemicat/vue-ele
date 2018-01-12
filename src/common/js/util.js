/**
 * url地址解析
 * @export
 */
export default function urlParse() {
  const url = location.search;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]]+/g;
  const arr = url.match(reg);

  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=');
      const key = tempArr[0];
      const val = tempArr[1];
      obj[key] = val;
    });
  }
  return { id: 123123 };
}
