export type MrbwriteProfile = {
  baudRate: number;
  keyword: {
    enterWriteMode: RegExp;
    exitWriteMode: RegExp;
  };
};

const defineProfile = <const P extends MrbwriteProfile>(profile: P): P =>
  profile;

// TODO: 将来的にはボードごとに異なるキーワードを使わないようにする;

export const esp32 = defineProfile({
  baudRate: 115200,
  keyword: {
    enterWriteMode: /\+OK mruby\/c/,
    exitWriteMode: /mruby\/c v\d(.\d+)* start/, // ESP32は終了時メッセージが出ないため、再起動時の開始時メッセージで判定
  },
});

export const rboard = defineProfile({
  baudRate: 19200,
  keyword: {
    enterWriteMode: /\+OK mruby\/c/,
    exitWriteMode: /\+OK Execute mruby\/c\./,
  },
});

export const rp2040 = defineProfile({
  baudRate: 19200,
  keyword: {
    enterWriteMode: /\+OK mruby\/c/,
    exitWriteMode: /\+OK/,
  },
});
