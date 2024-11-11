import { getDate, getPath, getTag } from "../../src/Util/getData";
import { getCommit } from "../../src/Util/request";

jest.mock("octokit");
jest.mock("../../src/Util/request");

getCommit.mockImplementation((path) => {
  console.log("enter getCommit");
  console.log("path", path);
  return new Promise((resolve) => {
    const response = {
      data: [
        {
          commit: {
            author: {
              name: "test name",
              email: "test email",
              date: "2024-10-29T02:48:18Z",
            },
          },
        },
      ],
    };

    resolve(response);
  });
});

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
    console.log(test);
  });
});
