//@ts-ignore
import hamming from 'hamming-distance';
//@ts-ignore
import imghash from 'imghash-turbo';

imghash
  .hash('/home/luxcium/Téléchargements/misc/bamarket115.bmp')
  .then((hash: any) => {
    console.log(hash); // 'f884c4d8d1193c07'
  });

// Custom hex length and result in binary
imghash
  .hash('/home/luxcium/Téléchargements/blur/bamarket115.bmp', 4, 'binary')
  .then((hash: any) => {
    console.log(hash); // '1000100010000010'
  });

const hash1 = imghash.hash(
  '/home/luxcium/Téléchargements/misc/bamarket115.bmp'
);
const hash2 = imghash.hash(
  '/home/luxcium/Téléchargements/blur/bamarket115.bmp'
);

Promise.all([hash1, hash2]).then(results => {
  const dist = hamming(results[0], results[1]);
  console.log(`Distance between images is: ${dist}`);
  if (dist <= 20) {
    console.log('Images are similar');
  } else {
    console.log('Images are NOT similar');
  }
});
/*
dnfi libavcodec
dnfi libavformat
dnfi libswscale
dnfi libjpeg
dnfi libpng
dnfi libsndfile
dnfi libsamplerate
dnfi libtiff

sudo apt-get install -y
dnf install git
dnf install libavcodec-dev
dnf install libavformat-dev
dnf install libswscale-dev
dnf install libjpeg-dev
dnf install libpng-dev
dnf install libsndfile-dev
dnf install libsamplerate-dev
dnf install libtiff-dev
dnf install g++
dnf install make
dnf install cmake
git clone https://github.com/aetilius/pHash
mkdir build && cd build
cmake -DWITH_AUDIO_HASH=ON -DWITH_VIDEO_HASH=ON ../pHash
make -j8
sudo make install
 */
