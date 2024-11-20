/**
 * @jest-environment jsdom
 */

import { removeLoadingSpinner } from "../../../src/UI/layout/renderLoadingSpinner";
import { $ } from "../../../src/Util/Helper";

document.body.innerHTML = `
    <div class="spinner display"></div>`;

describe("removeLoadingSpinner 체크", () => {
  const spinner = $(".spinner");
  test("기본 상태 확인", () => {
    expect(spinner.classList.contains("display")).toBeTruthy();
  });

  test("동작 확인", () => {
    removeLoadingSpinner();
    expect(spinner.classList.contains("display")).toBeFalsy();
  });
});
