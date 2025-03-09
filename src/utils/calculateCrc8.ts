export const calculateCrc8 = (data?: Uint8Array): number | undefined => {
  const hash = data?.reduce((crc, byte) => {
    const poly = 0x31;
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
