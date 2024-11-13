/**
 * @jest-environment jsdom
 */

import { getStorage, setStorage } from "../../src/store/store";

class SessionStorageMock {
  store = {};
  length = this.store.length;

  constructor() {}
  getItem(key) {
    return this.store[key] ?? null;
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

    expect(sessionStorage.getItem("test")).toEqual(`{"data":"test"}`);
  });

  test("여러 데이터 삽입 확인", () => {
    setStorage("test1", { data: "test1" });
    setStorage("test2", { data: "test2" });
    setStorage("test3", { data: "test3" });

    expect(sessionStorage.getItem("test1")).toEqual(`{"data":"test1"}`);
    expect(sessionStorage.getItem("test2")).toEqual(`{"data":"test2"}`);
    expect(sessionStorage.getItem("test3")).toEqual(`{"data":"test3"}`);
  });

  test("데이터 중복 삽입 확인", () => {
    setStorage("test1", { data: "test1" });
    setStorage("test1", { data: "test2" });
    setStorage("test1", { data: "test3" });

    expect(sessionStorage.getItem("test1")).toEqual(`{"data":"test3"}`);
  });
});

describe("getStorage 체크", () => {
  test("작동 확인", () => {
    setStorage("test", { data: "test" });
    const test = getStorage("test");
    expect(test).toEqual(`{"data":"test"}`);
  });

  test("여러 데이터 확인", () => {
    setStorage("test1", { data: "test1" });
    setStorage("test2", { data: "test2" });
    setStorage("test3", { data: "test3" });

    expect(getStorage("test1")).toEqual(`{"data":"test1"}`);
    expect(getStorage("test2")).toEqual(`{"data":"test2"}`);
    expect(getStorage("test3")).toEqual(`{"data":"test3"}`);
  });

  test("존재하지 않는 데이터 확인할 경우", () => {
    const test = getStorage("test10");
    expect(test).toBeNull();
  });
});
