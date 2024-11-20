import { ELEMENT } from "../../constants/HTML_ELEMENT";
import { $, $All } from "../../Util/Helper";
import { renderAnchors } from "./renderAnchor";
import { renderContentCopy } from "./renderContentCopy";
import { renderSections } from "./renderSections";

const replaceCheckbox = (html) => {
  return html
    .replaceAll("[ ]", ELEMENT.CHECKBOX)
    .replaceAll("[x]", ELEMENT.CHECKBOX_SELECT);
};

const renderContent = ({ title, html }) => {
  const mainElement = $(".content-container");
  document.title = title.toUpperCase();

  const replacedHtml = replaceCheckbox(html);
  mainElement.insertAdjacentHTML("afterbegin", replacedHtml);
};

const createImgId = (element) => {
  return element.src.split("/").pop().replaceAll("%20", " ");
};

const createImgSrc = ({ type, content }) => {
  return `data:image/${type};base64, ${content}`;
};

const renderImage = (images) => {
  const imageElements = $All("img");
  imageElements.forEach((imageElement) => {
    imageElement.id = createImgId(imageElement);
    const image = images.find((image) => image.name === imageElement.id);

    if (image) {
      imageElement.src = createImgSrc(image);
    } else {
      imageElement.remove();
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
