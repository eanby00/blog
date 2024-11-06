import { decodeBase64 } from "../../src/Util/decodeBase64";

describe("decodeBase64 체크", () => {
  test("raw가 없는 경우 : return null", () => {
    const test = decodeBase64();
    expect(test).toEqual(null);
  });

  test("raw가 base64로 디코딩된 문자가 아닌 경우 : return null", () => {
    const test = decodeBase64("dGV12414141+1zdsfa5aealkn'65dg45sg");
    expect(test).toEqual(null);
  });

  test("raw가 base64로 디코딩된 문자인 경우 : return 'test'", () => {
    const test = decodeBase64("dGVzdA==");
    expect(test).toEqual("test");
  });
});
