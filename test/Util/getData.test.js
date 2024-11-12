import { getDate, getPath, getTag } from "../../src/Util/getData";

jest.mock("octokit");
jest.mock("../../src/Util/request");

describe("getTag 체크", () => {
  test("올바른 경우", () => {
    const test = getTag("test/test1/test2");
    expect(test).toEqual("test1");
  });
});

describe("getPath 체크", () => {
  test("올바른 경우", () => {
    const test = getPath("test/test1/test2");
    expect(test).toEqual("test/test1");
  });
});

describe("getDate 체크", () => {
  test("올바른 경우", async () => {
    const test = await getDate("test");
    expect(test).toEqual(new Date("2024-10-29T02:48:18.000Z"));
  });
});
