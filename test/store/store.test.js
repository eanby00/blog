/**
 * @jest-environment jsdom
 */

import { setStorage } from "../../src/store/store";

class SessionStorageMock {
  store = {};
  length = this.store.length;

  constructor() {}
  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value;
    this.length = this.store.length;
  }

  key(index) {
    return Object.keys(this.store)[index];
  }
}

Object.defineProperty(window, "sessionStorage", {
  value: new SessionStorageMock(),
});

describe("setStorage 체크", () => {
  test("작동 확인", () => {
    setStorage("test", { data: "test" });

    expect(JSON.parse(sessionStorage.getItem("test"))).toEqual({
      data: "test",
    });
  });
});
