export const NULL = null;
// export function lineFilter(str) {
//   return line => {
//     const result = line.search(str);
//     return result > -1;
//   };
// }

// export async function getMainPages2(url, content, filterItems, index) {
//   try {
//     const { getInnerHTML, ...moreContent } = content;
//     const galeries = BoxedList.of(await getInnerHTML()).mapItems(splitLines);
//  const filterItems = ['/galleries/', 'href="https', 'https://'];
//     // const lines_start = splitLines(await getInnerHTML());
//     const filtered_01 = filterLines(filterItems[0])([lines_start]);
//     const filtered_02 = filterLines(filterItems[1])([...filtered_01]);
//     const splited_03 = filtered_02.flat().map(line => line.split('"'));
//     const filtered_04 = filterLines(filterItems[2])([...splited_03]).flat();
//     const galleries_final = uniqLines(filtered_04);
//     void galeries;
//     return {
//       id: index + 1,
//       fromUrl: url,
//       galleries: galleries_final,
//       length: galleries_final.length,
//       ...moreContent,
//       error: null,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       id: 0,
//       fromUrl: 'error',
//       galleries: [],
//       length: 0,
//       getPage: () => ({ close: () => null }),
//       getBrowser: () => ({
//         close: () => null,
//       }),
//       pager: _ => null,
//       error,
//     };
//   }
// }

// export function filterLines(str) {
//   return linesList => linesList.map(linesFilter(str));
// }

// export function linesFilter(str) {
//   return lines => lines.filter(lineFilter(str));
// }

// export function lineFilter(str) {
//   return line => {
//     const result = line.search(str);
//     return result > -1;
//   };
// }
