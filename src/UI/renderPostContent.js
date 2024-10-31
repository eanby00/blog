import { $ } from "../Util/Helper";

const replaceCheckbox = (html) => {
  return html
    .replaceAll(
      "[ ]",
      `<input type="checkbox" disabled><label></label></input>`
    )
    .replaceAll(
      "[x]",
      `<input type="checkbox" checked disabled><label></label></input>`
    );
};

export const renderPostContent = (post) => {
  const mainElement = $("main article");
  document.title = post.title.toUpperCase();

  const html = post.html;
  const replacedHtml = replaceCheckbox(html);
  mainElement.insertAdjacentHTML("afterbegin", replacedHtml);
};

export const renderImage = (post) => {
  const imageElements = document.querySelectorAll("img");
  const images = post.images;
  imageElements.forEach((imageElement) => {
    imageElement.id = imageElement.src.split("/").pop().replaceAll("%20", " ");
    const image = images.find((image) => image.name === imageElement.id);
    if (image) {
      imageElement.src = `data:image/${image.type};base64, ${image.content}`;
    }
  });
};
