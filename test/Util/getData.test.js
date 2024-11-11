jest.mock("octokit");

import { getTag } from "../../src/Util/getData";

jest.mock("../../src/Util/request");

describe("getTag 체크", () => {
  test("올바른 경우", () => {
    const test = getTag("test/test1/test2");
    expect(test).toEqual("test1");
  });
});
