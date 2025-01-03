/**
 * @jest-environment jsdom
 */

import {
  getStorage,
  hasData,
  loadData,
  saveData,
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
    expect(test).toEqual({ data: "test" });
  });

  test("여러 데이터 확인", () => {
    sessionStorage.clear();

    setStorage("test1", { data: "test1" });
    setStorage("test2", { data: "test2" });

    expect(getStorage("test1")).toEqual({ data: "test1" });
    expect(getStorage("test2")).toEqual({ data: "test2" });
  });

  test("존재하지 않는 데이터 확인할 경우", () => {
    sessionStorage.clear();

    const test = getStorage("test10");
    expect(test).toBeNull();
  });
});

describe("hasData 체크", () => {
  test("데이터가 존재하지 않는 경우", () => {
    sessionStorage.clear();
    const test = hasData();
    expect(test).toBeFalsy();
  });

  test("데이터가 존재하지만, 정상적인 데이터가 아닌 경우", () => {
    sessionStorage.clear();
    setStorage("test", { data: "test" });

    const test = hasData();

    expect(test).toBeFalsy();
  });

  test("데이터가 존재하는 경우", () => {
    sessionStorage.clear();
    setStorage("tags", { data: "test" });

    const test = hasData();

    expect(test).toBeTruthy();
  });
});

describe("saveData 체크", () => {
  const postMock = [
    { id: 1, data: "test1" },
    { id: 2, data: "test2" },
    { id: 3, data: "test3" },
    { id: 4, data: "test4" },
  ];

  test("작동 확인", () => {
    sessionStorage.clear();
    saveData(postMock, { data: "tag mocked data" });
    expect(sessionStorage.length).toEqual(5);

    expect(getStorage("1")).toEqual({ id: 1, data: "test1" });
    expect(getStorage("tags")).toEqual({ data: "tag mocked data" });
  });
});

describe("loadData 체크", () => {
  const postMock = [
    { id: 1, data: "test1" },
    { id: 2, data: "test2" },
    { id: 3, data: "test3" },
    { id: 4, data: "test4" },
  ];

  test("작동 확인", () => {
    sessionStorage.clear();
    saveData(postMock, { data: "tag mocked data" });

    const { posts, tags } = loadData();
    expect(posts).toEqual(postMock);
    expect(tags).toEqual({ data: "tag mocked data" });
  });
});
