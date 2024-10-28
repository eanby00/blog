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
  const mainElement = $("main article");
  const navElement = createElement(".nav-anchor", "nav");
  INDEX_ANCHOR.H_TAG_NAME.forEach((tagName) => {
    setAnchor(mainElement, tagName);
  });

  const anchorList = mainElement.querySelector("ul li a").closest("ul");
  navElement.append(anchorList);
  $("aside").append(navElement);
};

const renderPostContent = (post) => {
  const mainElement = $("main article");
  document.title = post.title.toUpperCase();

  const html = post.html;
  mainElement.insertAdjacentHTML("afterbegin", html);
};

export const renderHeader = () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const aside = $("aside");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display-block");
    aside.classList.toggle("open");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
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

const copyText = async (tag, copyButton, copyDone) => {
  await navigator.clipboard.writeText(tag.querySelector("code").textContent);
  copyDone.classList.toggle("close");
  copyButton.classList.toggle("close");
  setTimeout(() => {
    copyDone.classList.toggle("close");
    copyButton.classList.toggle("close");
  }, 2000);
};

const renderContentCopy = () => {
  document.querySelectorAll("pre").forEach((tag) => {
    const copyButton = createElement(".content-copy", "svg");
    const copyDone = createElement(".content-copy-done", "svg");
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

export const renderPostPage = (post) => {
  renderPostContent(post);
  renderHeader();
  renderAnchors();
  renderImage(post);
  renderGithubIcon(post.html_url);
  renderUpToTop();
  renderContentCopy();
  removeLoadingSpinner();
};
