import { formatDate, getDate, getPath, getTag } from "../../src/Util/getData";

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

describe("formatDate 체크", () => {
  const now = new Date();

  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  const date = now.getDate();

  test("현재 시간을 기준으로 체크", () => {
    const test = formatDate(now);
    const answer = `${year}.${
      month < 10 ? "0" + month.toString() : month
    }.${date}.`;

    console.log(test);
    expect(test).toEqual(answer);
  });

  test("현재 달이 만약 한 자리 수일 경우 체크", () => {
    now.setMonth(5);
    let month = now.getMonth() + 1;

    const test = formatDate(now);
    const answer = `${year}.${
      month < 10 ? "0" + month.toString() : month
    }.${date}.`;

    console.log(test);
    expect(test).toEqual(answer);
  });
});
