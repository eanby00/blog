import { INDEX_ANCHOR } from "../constants/MD";
import { $ } from "../Util/Helper";

const parseAnchorID = (textContent) => {
  const textList = textContent.toLowerCase().split("");
  const replacedText = textList.map((text) => {
    if (text === " ") {
      return "-";
    }

    if (text in INDEX_ANCHOR.REMOVE_TEXT_LIST) {
      return "";
    }

    return text;
  });
  return replacedText.join("");
};

const setAnchorID = (tag) => {
  tag.id = parseAnchorID(tag.textContent);
};

const setAnchor = (targetElement, tag) => {
  targetElement.querySelectorAll(tag).forEach(setAnchorID);
};

const renderAnchors = () => {
  const mainElement = $("main");
  INDEX_ANCHOR.H_TAG_NAME.forEach((tagName) => {
    setAnchor(mainElement, tagName);
  });
};

const renderPostContent = (post) => {
  const mainElement = $("main");
  document.title = post.title.toUpperCase();

  const html = post.html;
  mainElement.insertAdjacentHTML("beforeend", html);
};

export const renderPostPage = (post) => {
  renderPostContent(post);
  renderAnchors();
};
