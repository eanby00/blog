/**
 * @jest-environment jsdom
 */

import * as header from "../../../src/UI/layout/renderHeader";
import { renderLayout } from "../../../src/UI/layout/renderLayout";
import { $ } from "../../../src/Util/Helper";

header.renderHeader = jest.fn();

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({ observe, unobserve }));

window.scrollTo = jest.fn();

document.body.innerHTML = `
<header class="main-header"></header>
<footer>
    <a href=""></a>
</footer>
<button class="upToTop"></button>
`;

renderLayout(".test", "http://localhost:8080/");

describe("renderGithubIcon 체크", () => {
  test("기본 작동 확인", () => {
    const footerLink = $("footer a");
    expect(footerLink.href).toEqual("http://localhost:8080/");
  });
});

describe("renderUpToTop 체크", () => {
  const upToTop = $(".upToTop");

  test("기본 상태 확인", () => {
    expect(upToTop.classList.contains("display")).toBeFalsy();
    expect(observe).toHaveBeenCalledTimes(1);
  });
});
