/**
 * @jest-environment jsdom
 */

import { renderAnchors } from "../../../src/UI/post/renderAnchor";
import { $, $All } from "../../../src/Util/Helper";

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({ observe, unobserve }));

document.body.innerHTML = `
    <template class="template-nav-anchor">
      <nav>
        <ul></ul>
      </nav>
    </template>

    <template class="template-anchor">
      <li><a></a></li>
    </template>

    <article class="content-container">
      <section id="test1" class="test">
        <h2>test1</h2>
      </section>
      <section id="test2" class="test">
        <h2>test2</h2>
      </section>
      <section id="test3" class="test">
        <h2>test3</h2>
      </section>
    </article>
    <aside class="anchor-container"></aside>
`;

renderAnchors();

describe("renderAnchors 체크", () => {
  test("기본 동작 확인", () => {
    const anchors = $All("aside li");
    expect(anchors).toHaveLength(3);

    const anchor = $("a", anchors[0]);
    expect(anchor.href).toEqual("http://localhost/#test1");
    expect(anchor.className).toEqual("test");
    expect(anchor.textContent).toEqual("test1");
  });
});
