jest.mock("unified");
jest.mock("remark-parse");
jest.mock("remark-rehype");
jest.mock("rehype-stringify");

import { getDescription, getHTMLFromMD } from "../../src/Util/getHTML";

const MOCKED_ELEMENT_TREE = {
  CASE_1: {
    type: "root",
    children: [
      {
        type: "blockquote",
        depth: 1,
        children: [
          {
            type: "text",
            value: "test 헤더 메시지",
          },
        ],
      },
    ],
  },
  CASE_2: {
    type: "text",
    value: "test 메시지",
  },
  CASE_3: {
    type: "heading",
    children: [],
  },
  CASE_4: {
    type: "root",
    children: [
      {
        type: "blockquote",
        depth: 1,
        children: [
          {
            value: "test 헤더 메시지",
          },
        ],
      },
    ],
  },
};

describe("mock getHTMLFromMD 체크", () => {
  test("작동 확인", () => {
    const test = getHTMLFromMD("<h1>test</h1>");
    expect(test).toEqual("<h1>test</h1>");
  });
});

describe("getDescription 체크", () => {
  test("올바르게 작동하는 경우", () => {
    const test = getDescription(MOCKED_ELEMENT_TREE.CASE_1);
    expect(test).toEqual("test 헤더 메시지");
  });

  test("tree에 children이 존재하지 않는 경우", () => {
    const test = getDescription(MOCKED_ELEMENT_TREE.CASE_2);
    expect(test).toEqual("");
  });

  test("children이 없는 경우", () => {
    const test = getDescription(MOCKED_ELEMENT_TREE.CASE_3);
    expect(test).toEqual("");
  });

  test("children의 타입이 없는 경우", () => {
    const test = getDescription(MOCKED_ELEMENT_TREE.CASE_4);
    expect(test).toEqual("");
  });
});
