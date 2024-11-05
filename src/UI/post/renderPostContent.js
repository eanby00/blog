import { $, $All } from "../../Util/Helper";
import { renderAnchors } from "./renderAnchor";
import { renderContentCopy } from "./renderContentCopy";
import { renderSections } from "./renderSections";

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

const renderContent = ({ title, html }) => {
  const mainElement = $(".content-container");
  document.title = title.toUpperCase();

  const replacedHtml = replaceCheckbox(html);
  mainElement.insertAdjacentHTML("afterbegin", replacedHtml);
};

const renderImage = (images) => {
  const imageElements = $All("img");
  imageElements.forEach((imageElement) => {
    imageElement.id = imageElement.src.split("/").pop().replaceAll("%20", " ");
    const image = images.find((image) => image.name === imageElement.id);
    if (image) {
      imageElement.src = `data:image/${image.type};base64, ${image.content}`;
    }
  });
};

export const renderPostContent = (post) => {
  renderContent(post);
  renderSections();
  renderAnchors();
  renderImage(post.images);
  renderContentCopy();
};
