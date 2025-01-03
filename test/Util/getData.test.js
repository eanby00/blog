import * as store from "../../src/store/store";
import { getDatas } from "../../src/Util/getData";

jest.mock("octokit");
jest.mock("../../src/Util/request");
jest.mock("../../src/Util/getHTML");
jest.mock("../../src/constants/API");
jest.mock("../../src/store/store");

describe("getDatas 체크", () => {
  test("sessionStorage의 데이터가 없는 경우", async () => {
    const { posts, tags } = await getDatas();

    expect(posts[0].title).toEqual("TEST11");
    expect(tags[0]).toEqual("test1");
  });

  test("sessionStorage의 데이터가 있는 경우", async () => {
    store.hasData = jest.fn();
    store.hasData.mockReturnValue(true);

    const { posts, tags } = await getDatas();

    expect(posts[0].title).toEqual("TEST11");
    expect(tags[0]).toEqual("test1");
  });
});
