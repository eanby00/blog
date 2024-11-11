jest.mock("unified");
jest.mock("remark-parse");
jest.mock("remark-rehype");
jest.mock("rehype-stringify");

import * as getHTML from "../../src/Util/getHTML";

const MOCKED_ELEMENT_TREE = {
  CASE_1: {
    type: "root",
    children: [
      {
        type: "heading",
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
    value: "오류의 경우",
  },
  CASE_4: {
    type: "heading",
    children: [],
  },
};

getHTML.getHTMLFromMD = jest.fn();
getHTML.getHTMLFromMD.mockReturnValue("<h1>test</h1>");

const getHTMLFromMD = getHTML.getHTMLFromMD;

describe("mock getHTMLFromMD 체크", () => {
  test("return 체크 : === <h1>test</h1>", () => {
    const test = getHTMLFromMD();
    expect(test).toEqual("<h1>test</h1>");
  });
});

describe("findDescription 체크", () => {
  test("올바르게 작동하는 경우1 : 'test 헤더 메시지'", () => {
    const test = getHTML.findDescription(MOCKED_ELEMENT_TREE.CASE_1);
    expect(test).toEqual("test 헤더 메시지");
  });

  test("올바르게 작동하는 경우2 : 'test 메시지'", () => {
    const test = getHTML.findDescription(MOCKED_ELEMENT_TREE.CASE_2);
    expect(test).toEqual("test 메시지");
  });

  test("type이 존재하지 않는 경우 : ''", () => {
    const test = getHTML.findDescription(MOCKED_ELEMENT_TREE.CASE_3);
    expect(test).toEqual("");
  });

  test("children이 존재하지 않는 경우 : ''", () => {
    const test = getHTML.findDescription(MOCKED_ELEMENT_TREE.CASE_4);
    expect(test).toEqual("");
  });
});
