console.log(parseInt('1111', 2));
('011000001001010000001111111010011001000100101101010011010011011');
console.log(
  BigInt(
    '0b011000001001010000001111111010011001000100101101010011010011011'
  ).toString()
);

const myDecInt = 6942;
const myString = '6942';
const myBigInt = 6942n;

const myOctInt = 015436;
const myBinInt = 0b1101100011110;
const myHexInt = 0x1b1e;
