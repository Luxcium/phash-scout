const fs = require('fs');
const dist = require('sharp-phash/distance');
const phash = require('sharp-phash');

main2;
function main2() {
  const img1 = fs.readFileSync(
    '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs/5d65f45e97830.jpeg'
  );
  const img2 = fs.readFileSync(
    '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs/5d309a40f2014.jpeg'
  );
  const img3 = fs.readFileSync(
    '/home/luxcium/.local/src/parallel-mapping/scripts/assets/Lenna-sepia.jpg'
  );
  const img4 = fs.readFileSync(
    '/home/luxcium/src/parallel-mapping/scripts/assets/xing.jpg'
  );
  // 1110011001111011100110011000110011110001011010100100111100100101
  Promise.all([phash(img1), phash(img2), phash(img3), phash(img4)]).then(
    ([hash1, hash2, hash3, hash4]) => {
      // hash returned is 64 characters length string with 0 and 1 only
      // assert(dist(hash1, hash2) < 5);
      // assert(dist(hash2, hash3) < 5);
      // assert(dist(hash3, hash1) < 5);
      // assert(dist(hash3, hash4) < 5);
      // (async () => console.log(await phash(img1)))();
      (async () => console.log(hash1))();
      (async () => console.log(hash2))();
      (async () => console.log(hash4))();
      (async () => console.log(dist(hash1, hash2)))();
      (async () => console.log(dist(hash2, hash3)))();
      (async () => console.log(dist(hash3, hash1)))();
      (async () => console.log(dist(hash3, hash4)))();
    }
  );
}
const folder = '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs';
main();
async function main() {
  const images = await fs.promises.readdir(folder, {
    withFileTypes: true,
  });

  for (const image of images.slice(0, 1000)) {
    if (image.isFile()) {
      const imgPath = `${folder}/${image.name}`;
      thisImage = await fs.promises.readFile(imgPath);
      console.log(await phash(thisImage));
    }
  }
}
