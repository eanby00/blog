import { $, $All, createElement } from "../../Util/Helper";

export const copyText = async (tag, copyButton, copyDone) => {
  await navigator.clipboard.writeText($("code", tag).textContent);
  copyDone.classList.toggle("close");
  copyButton.classList.toggle("close");
  setTimeout(() => {
    copyDone.classList.toggle("close");
    copyButton.classList.toggle("close");
  }, 2000);
};

export const renderContentCopy = () => {
  $All("pre").forEach((tag) => {
    const copyButton = createElement(".template-content-copy", "svg");
    const copyDone = createElement(".template-content-copy-done", "svg");
    copyButton.addEventListener(
      "click",
      copyText.bind(null, tag, copyButton, copyDone)
    );
    const div = document.createElement("div");
    div.append(copyButton);
    div.append(copyDone);
    tag.append(div);
  });
};
