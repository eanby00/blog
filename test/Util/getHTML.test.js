jest.mock("unified");
jest.mock("remark-parse");
jest.mock("remark-rehype");
jest.mock("rehype-stringify");

import * as getHTML from "../../src/Util/getHTML";
getHTML.getHTMLFromMD = jest.fn();
getHTML.getHTMLFromMD.mockReturnValue("<h1>test</h1>");

const getHTMLFromMD = getHTML.getHTMLFromMD;

describe("mock getHTMLFromMD 체크", () => {
  test("return 체크 : === <h1>test</h1>", () => {
    const test = getHTMLFromMD();
    expect(test).toEqual("<h1>test</h1>");
  });
});
