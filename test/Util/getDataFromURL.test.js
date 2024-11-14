/**
 * @jest-environment jsdom
 */

import * as store from "../../src/store/store";
import { getDataFromURL } from "../../src/Util/getDataFromURL";

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
    expect(location.href).toEqual("http://localhost:8080/");
  });

  test("비정상적인 URL인 경우", () => {
    expect(() => {
      location.href = "http://localhost:8080/post/";
      const test = getDataFromURL();
    }).toThrow();
  });
});
