/**
 * @jest-environment jsdom
 */

import { renderSections } from "../../../src/UI/post/renderSections";
import { $ } from "../../../src/Util/Helper";

document.body.innerHTML = `
    <article class="content-container">
      <h1>test</h1>
      <blockquote>
        <p>test 테스트 메시지</p>
      </blockquote>
      <h2>test 1</h2>
      <ul>
        <li>test1 테스트 메시지</li>
      </ul>
      <h2>test&11</h2>
      <ul>
        <li>test11 테스트 메시지 1</li>
        <li>test11 테스트 메시지 2</li>
        <li>test11 테스트 메시지 3</li>
      </ul>
    </article>
`;

describe("renderSections 체크", () => {
  const container = $(".content-container");
  test("기본 상태 확인", () => {
    expect(container.children).toHaveLength(6);
  });

  test("기본 동작 확인", () => {
    renderSections();
    expect(container.children).toHaveLength(3);
    expect(container.children[0].id).toEqual("test");
    expect(container.children[1].id).toEqual("test-1");
    expect(container.children[2].id).toEqual("test11");
  });
});
