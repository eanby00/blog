import { isFolder, isMDFile } from "../../src/Util/checkType";

describe("isFolder 함수 체크", () => {
  test("배열이 들어오는 경우: true", () => {
    const test = isFolder([1, 2, 3, 4, 5]);
    expect(test).toBeTruthy();
  });

  test("빈 배열이 들어오는 경우: true", () => {
    const test = isFolder([]);
    expect(test).toBeTruthy();
  });

  test("객체가 들어오는 경우: false", () => {
    const test = isFolder({ id: 1, name: "me" });
    expect(test).toBeFalsy();
  });

  test("빈 객체가 들어오는 경우: false", () => {
    const test = isFolder({});
    expect(test).toBeFalsy();
  });

  test("매개변수가 비어 있는 경우: false", () => {
    const test = isFolder();
    expect(test).toBeFalsy();
  });
});

describe("isMDFile 함수 체크", () => {
  test("md 파일이 들어오는 경우 : true", () => {
    const test = isMDFile({ name: "test.md" });
    expect(test).toBeTruthy();
  });

  test("txt 파일이 들어오는 경우 : false", () => {
    const test = isMDFile({ name: "test.txt" });
    expect(test).toBeFalsy();
  });

  test("mmd 파일이 들어오는 경우 : false", () => {
    const test = isMDFile({ name: "test.mmd" });
    expect(test).toBeFalsy();
  });

  test("name이 없는 경우 : false", () => {
    const test = isMDFile({ id: 1 });
    expect(test).toBeFalsy();
  });

  test("매개변수가 비어 있는 경우 : false", () => {
    const test = isMDFile();
    expect(test).toBeFalsy();
  });
});
