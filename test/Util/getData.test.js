jest.mock("octokit");

import { getPath, getTag } from "../../src/Util/getData";

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
