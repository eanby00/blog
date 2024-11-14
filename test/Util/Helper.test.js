/**
 * @jest-environment jsdom
 */

import {
  $,
  createElement,
  deduplication,
  formatDate,
  generateID,
  hasClass,
  sortArray,
} from "../../src/Util/Helper";

document.body.innerHTML = `
    <template class="template-test">
      <div>This is test div</div>
      <p>This is test p</p>
    </template>

    <div class="test-div">This is class Test1</div>
    <div class="test-div">This is class Test2</div>
    <span class="test-span">This is class test span1</span>
    <div class="test-div">This is class Test3</div>
    <div class="test-div">This is class Test4</div>
    `;

describe("createElement 체크", () => {
  test("targetTag가 존재할 경우", () => {
    const test = createElement(".template-test", "div");
    expect(test.textContent).toEqual("This is test div");
  });

  test("targetTag가 존재하지 않을 경우", () => {
    const testElement = createElement(".template-test");
    const test = $("p", testElement);
    expect(test.textContent).toEqual("This is test p");
  });

  test("매개변수가 없을 경우", () => {
    expect(() => {
      const test = createElement();
    }).toThrow();
  });
});

describe("hasClass 체크", () => {
  test("element가 class를 가지고 있는 경우", () => {
    const divElement = document.createElement("div");
    divElement.classList.add("test");

    const test = hasClass(divElement, "test");
    expect(test).toBeTruthy();
  });

  test("element가 class를 가지고 있지 않는 경우", () => {
    const divElement = document.createElement("div");
    divElement.classList.add("test");

    const test = hasClass(divElement, "test1");
    expect(test).toBeFalsy();
  });

  test("class가 없는 경우", () => {
    const divElement = document.createElement("div");

    const test = hasClass(divElement);
    expect(test).toBeFalsy();
  });

  test("element가 없는 경우", () => {
    expect(() => {
      const test1 = hasClass("test");
    }).toThrow();

    expect(() => {
      const test2 = hasClass();
    }).toThrow();
  });
});

describe("generateID 체크", () => {
  test("'test'를 title로 하였을 경우", () => {
    const test = generateID("test");
    expect(test.slice(0, 3)).toEqual("1c0");
  });

  test("'test10'를 title로 하였을 경우", () => {
    const test = generateID("test10");
    expect(test.slice(0, 3)).toEqual("221");
  });
});

describe("sortArray 체크", () => {
  const answerArray = [
    { id: 3, date: 5 },
    { id: 4, date: 4 },
    { id: 5, date: 3 },
    { id: 2, date: 2 },
    { id: 1, date: 1 },
  ];

  test("정렬되지 않은 배열을 정렬할 경우", () => {
    const testArray = [
      { id: 1, date: 1 },
      { id: 2, date: 2 },
      { id: 3, date: 5 },
      { id: 4, date: 4 },
      { id: 5, date: 3 },
    ];
    const test = sortArray(testArray);
    expect(test).toEqual(answerArray);
  });

  test("내림차순으로 정렬된 배열을 정렬할 경우", () => {
    const testArray = [
      { id: 3, date: 5 },
      { id: 4, date: 4 },
      { id: 5, date: 3 },
      { id: 2, date: 2 },
      { id: 1, date: 1 },
    ];
    const test = sortArray(testArray);
    expect(test).toEqual(answerArray);
  });

  test("오름차순으로 정렬된 배열을 정렬할 경우", () => {
    const testArray = [
      { id: 1, date: 1 },
      { id: 2, date: 2 },
      { id: 5, date: 3 },
      { id: 4, date: 4 },
      { id: 3, date: 5 },
    ];
    const test = sortArray(testArray);
    expect(test).toEqual(answerArray);
  });
});

describe("deduplication 체크", () => {
  test("중복이 없는 경우", () => {
    const test = deduplication([1, 2, 3, 4, 5]);
    expect(test).toHaveLength(5);
  });

  test("중복이 있는 경우", () => {
    const test = deduplication([1, 2, 3, 2, 1]);
    expect(test).toHaveLength(3);
  });

  test("배열이 없는 경우", () => {
    const test = deduplication();
    expect(test).toHaveLength(0);
  });
});

describe("formatDate 체크", () => {
  test("달이 10보다 큰 경우", () => {
    const testTime = "2024-11-13T07:40:42.303Z";
    const test = formatDate(new Date(testTime));

    expect(test).toEqual("2024.11.13.");
  });

  test("달이 10보다 작은 경우", () => {
    const testTime = "2024-05-13T07:40:42.303Z";
    const test = formatDate(new Date(testTime));

    expect(test).toEqual("2024.05.13.");
  });
});
