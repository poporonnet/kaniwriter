/**
 * 与えられたバイナリデータのCRC8ハッシュ値を計算する
 * - CRCレジスタ初期値: `0xff`
 * - 生成多項式: `x^8 + x^5 + x^4 + 1`(`0x31`)
 * - RefIn: なし(`false`)
 * - RefOut: なし(`false`)
 * - XorOut: なし(`0x00`)
 *
 * @see https://www.sunshine2k.de/articles/coding/crc/understanding_crc.html
 */
export const calculateCrc8 = (data: Uint8Array): number => {
  const poly = 0x31;
  const hash = data?.reduce((crc, byte) => {
    crc ^= byte;
    for (let i = 8; i > 0; --i) {
      if (crc & 0x80) {
        crc = (crc << 1) ^ poly;
      } else {
        crc = crc << 1;
      }
    }
    crc &= 0xff;
    return crc;
  }, 0xff);
  return hash;
};
