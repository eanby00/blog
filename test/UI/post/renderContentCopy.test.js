/**
 * @jest-environment jsdom
 */

import {
  copyText,
  renderContentCopy,
} from "../../../src/UI/post/renderContentCopy";
import { $, $All } from "../../../src/Util/Helper";

// window.navigator = jest.fn(() => ({
//   clipboard: jest.fn(() => ({ writeText: jest.fn() })),
// }));

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

document.body.innerHTML = `
    <template class="template-content-copy">
      <svg class="copy-icon"></svg>
    </template>

    <template class="template-content-copy-done">
      <svg class="copy-icon-done close"></svg>
    </template>

    <pre><code>"It's Test Text</code></pre>
    <pre><code></code></pre>
    <div></div>
    <pre><code></code></pre>
`;

renderContentCopy();
describe("renderContentCopy 체크", () => {
  test("renderContentCopy 기본 동작 확인", () => {
    const buttonContainer = $All("pre div");
    expect(buttonContainer).toHaveLength(3);
  });

  test("copyText 기본 동작 확인", async () => {
    const [copyButton, copyDone] = $("pre div").children;
    jest.useFakeTimers();

    expect(copyButton.classList.contains("close")).toBeFalsy();
    expect(copyDone.classList.contains("close")).toBeTruthy();

    await copyText($("pre"), copyButton, copyDone);

    jest.runAllTimers();

    expect(copyButton.classList.contains("close")).toBeFalsy();
    expect(copyDone.classList.contains("close")).toBeTruthy();
  });
});
