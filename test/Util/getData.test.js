import {
  formatDate,
  getDate,
  getPath,
  getTag,
  modifyImage,
  modifyPost,
} from "../../src/Util/getData";

jest.mock("octokit");
jest.mock("../../src/Util/request");
jest.mock("../../src/Util/getHTML");

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

    expect(test).toEqual(answer);
  });

  test("현재 달이 만약 한 자리 수일 경우 체크", () => {
    now.setMonth(5);
    let month = now.getMonth() + 1;

    const test = formatDate(now);
    const answer = `${year}.${
      month < 10 ? "0" + month.toString() : month
    }.${date}.`;

    expect(test).toEqual(answer);
  });
});

describe("modifyPost 체크", () => {
  test("올바르게 작동하는 경우1", async () => {
    const mockedData = {
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test1/test2/test3/test.md",
      name: "test.md",
      html_url: "test html url",
    };

    const test = await modifyPost(mockedData);
    expect(test.title).toEqual("test");
    expect(test.tag).toEqual("test2");
    expect(test.path).toEqual("test1/test2/test3");
    expect(test.html_url).toEqual("test html url");
  });

  test("올바르게 작동하는 경우2", async () => {
    const mockedData = {
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test4/test5/test6/test7.md",
      name: "test7.md",
      html_url: "test html_url",
    };

    const test = await modifyPost(mockedData);
    expect(test.title).toEqual("test7");
    expect(test.tag).toEqual("test5");
    expect(test.path).toEqual("test4/test5/test6");
    expect(test.html_url).toEqual("test html_url");
  });
});

describe("modifyImage 체크", () => {
  test("들어온 데이터가 md 파일인 경우", () => {
    const mockedData = {
      name: "test.md",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2/test.md",
    };
    const test = modifyImage(mockedData);
    expect(test).toEqual({
      name: "test.md",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2",
      type: "md",
    });
  });

  test("들어온 데이터가 png 파일인 경우", () => {
    const mockedData = {
      name: "test.png",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2/test.png",
    };
    const test = modifyImage(mockedData);
    expect(test).toEqual({
      name: "test.png",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2",
      type: "png",
    });
  });

  test("들어온 데이터가 jpg 파일인 경우", () => {
    const mockedData = {
      name: "test.jpg",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2/test.jpg",
    };
    const test = modifyImage(mockedData);
    expect(test).toEqual({
      name: "test.jpg",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2",
      type: "jpg",
    });
  });

  test("들어온 데이터가 webp 파일인 경우", () => {
    const mockedData = {
      name: "test.webp",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2/test.webp",
    };
    const test = modifyImage(mockedData);
    expect(test).toEqual({
      name: "test.webp",
      content: "PGgxPnRlc3Q8L2gxPg==",
      path: "test/test1/test2",
      type: "webp",
    });
  });
});
