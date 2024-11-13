/**
 * @jest-environment jsdom
 */

import {
  getKey,
  getPosts,
  getStorage,
  getTags,
  setStorage,
} from "../../src/store/store";

class SessionStorageMock {
  store = {};

  constructor() {}
  getItem(key) {
    return this.store[key] ?? null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  key(index) {
    return Object.keys(this.store)[index];
  }

  clear() {
    this.store = {};
  }

  get length() {
    return Object.keys(this.store).length;
  }
}

Object.defineProperty(window, "sessionStorage", {
  value: new SessionStorageMock(),
});

describe("setStorage 체크", () => {
  test("작동 확인", () => {
    sessionStorage.clear();

    setStorage("test", { data: "test" });

    expect(sessionStorage.getItem("test")).toEqual(`{"data":"test"}`);
  });

  test("여러 데이터 삽입 확인", () => {
    sessionStorage.clear();

    setStorage("test1", { data: "test1" });
    setStorage("test2", { data: "test2" });

    expect(sessionStorage.getItem("test1")).toEqual(`{"data":"test1"}`);
    expect(sessionStorage.getItem("test2")).toEqual(`{"data":"test2"}`);
  });

  test("데이터 중복 삽입 확인", () => {
    sessionStorage.clear();

    setStorage("test1", { data: "test1" });
    setStorage("test1", { data: "test2" });
    setStorage("test1", { data: "test3" });

    expect(sessionStorage.getItem("test1")).toEqual(`{"data":"test3"}`);
  });
});

describe("getStorage 체크", () => {
  test("작동 확인", () => {
    sessionStorage.clear();

    setStorage("test", { data: "test" });

    const test = getStorage("test");
    expect(test).toEqual(`{"data":"test"}`);
  });

  test("여러 데이터 확인", () => {
    sessionStorage.clear();

    setStorage("test1", { data: "test1" });
    setStorage("test2", { data: "test2" });

    expect(getStorage("test1")).toEqual(`{"data":"test1"}`);
    expect(getStorage("test2")).toEqual(`{"data":"test2"}`);
  });

  test("존재하지 않는 데이터 확인할 경우", () => {
    sessionStorage.clear();

    const test = getStorage("test10");
    expect(test).toBeNull();
  });
});

describe("getKey 체크", () => {
  test("작동 확인", () => {
    sessionStorage.clear();

    setStorage("test", { data: "test" });
    setStorage("test1", { data: "test1" });

    expect(getKey(0)).toEqual("test");
    expect(getKey(1)).toEqual("test1");
  });
});

describe("getPosts 체크", () => {
  test("작동 확인", () => {
    sessionStorage.clear();

    setStorage("test", { data: "test" });
    setStorage("test1", { data: "test1" });
    setStorage("test2", { data: "test2" });

    const test = getPosts();
    expect(test).toHaveLength(3);
  });

  test("tags가 있을 경우", () => {
    sessionStorage.clear();

    setStorage("test", { data: "test" });
    setStorage("test1", { data: "test1" });
    setStorage("tags", { data: "tags" });

    const test = getPosts();
    expect(test).toHaveLength(2);
  });
});

describe("getTags 체크", () => {
  test("작동 확인", () => {
    sessionStorage.clear();

    setStorage("test", { data: "test" });
    setStorage("test1", { data: "test1" });
    setStorage("tags", { data: "tags" });

    const test = getTags();
    expect(test).toEqual({ data: "tags" });
  });
});
