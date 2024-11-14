/**
 * @jest-environment jsdom
 */

import * as store from "../../src/store/store";
import { getDataFromURL, getDomainURL } from "../../src/Util/getDataFromURL";

const mockResponse = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

describe("getDomainURL 체크", () => {
  test("Domain URL이 없는 경우", () => {
    location.href = "http://localhost:8080";

    const test = getDomainURL();
    expect(test).toEqual("http://localhost:8080");
  });

  test("Domain URL이 있는 경우", () => {
    const test = getDomainURL();
    expect(test).toEqual("http://localhost:8080");
  });
});

describe("getDataFromURL 체크", () => {
  test("정상적인 URL인 경우", () => {
    store.getStorage = jest.fn();
    store.getStorage.mockReturnValue({ data: true });

    location.href = "http://localhost:8080/post/?id=35df7b2b07c1e8108";
    const test = getDataFromURL();
    expect(test).toEqual({ data: true });
  });

  test("정상적인 URL이지만, id에 대응하는 데이터가 없는 경우", () => {
    store.getStorage = jest.fn();
    store.getStorage.mockReturnValue(null);

    location.href = "http://localhost:8080/post/?id=35df7b2b07c1e8108";
    expect(() => {
      const test = getDataFromURL();
    }).toThrow();
  });

  test("비정상적인 URL인 경우", () => {
    expect(() => {
      location.href = "http://localhost:8080/post/";
      const test = getDataFromURL();
    }).toThrow();
  });
});
