import { INDEX_ANCHOR } from "../constants/MD";
import { $, createElement } from "../Util/Helper";
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

const observeHeader = (targetEl, entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      targetEl.classList.add("close");
    } else {
      targetEl.classList.remove("close");
    }
  });
};

const renderUpToTop = () => {
  const upToTopButton = $(".upToTop");
  upToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  const header = $(".main-header");
  const observer = new IntersectionObserver(
    observeHeader.bind(null, upToTopButton)
  );
  observer.observe(header);
};

const copyText = async () => {
  await navigator.clipboard.writeText($("code").textContent);
  console.log("done");
};

const renderContentCopy = () => {
  document.querySelectorAll("pre").forEach((code) => {
    const copyButton = createElement(".content-copy", "svg");
    copyButton.addEventListener("click", copyText);
    code.append(copyButton);
  });
};

export const renderPostPage = (post) => {
  renderPostContent(post);
  renderAnchors();
  renderImage(post);
  renderGithubIcon(post.html_url);
  renderUpToTop();
  renderContentCopy();
  removeLoadingSpinner();
};
