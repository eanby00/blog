import { INDEX_ANCHOR } from "../constants/MD";
import { $ } from "../Util/Helper";
import { removeLoadingSpinner } from "./renderLoadingSpinner";

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

const renderImage = (post) => {
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

const renderGithubIcon = (href) => {
  const githubIcon = $("footer a");
  githubIcon.href = href;
  githubIcon.classList.remove("close");
};

export const renderPostPage = (post) => {
  renderPostContent(post);
  renderAnchors();
  renderImage(post);
  renderGithubIcon(post.html_url);
  removeLoadingSpinner();
};
