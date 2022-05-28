import { getPathWithStats } from './getPathWithStats';
import { FileTypes } from './tools';

main000();
async function main000() {
  let count1 = 0;
  let count2 = 0;
  let ix1 = 0;
  for await (const a1 of getPathWithStats(
    '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users',
    false
  )) {
    ix1++;
    // console.log(ix1++, 0, 0, a1);
    let ix2 = 0;
    if (a1.type !== FileTypes.Error) {
      for await (const a2 of a1.getChild()) {
        ix2++;
        // console.log(ix1, ix2++, 0, a2);
        let ix3 = 0;
        if (a2.type !== FileTypes.Error) {
          for await (const a3 of a2.getChild()) {
            ix3++;
            void ix1, ix2, ix3;
            // console.log(ix1, ix2, ix3);
            const { fileName, fullPath, dir, type, ...r } = a3;
            // console.log(fileName);
            // console.log(`"${fullPath}"`);
            // console.log(dir);
            // console.log(type);
            // console.log(r);
            if (count1 !== ix1) {
              console.log(1, ix1 - 1, count2);
              count1++;
              count2 = 0;
            }
            // if (count2 !== ix2) {
            //   console.log(2, ix2);
            count2++;
            count2;
            // }
            a3;
            void fileName, fullPath, dir, type, r;
          }
        }
      }
    }
  }
}
