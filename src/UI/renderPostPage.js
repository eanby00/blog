import { INDEX_ANCHOR } from "../constants/MD";
import { $, createElement } from "../Util/Helper";
import { removeLoadingSpinner } from "./renderLoadingSpinner";

const splitH1Section = (tagName) => {
  const article = $("main article");
  const nodes = Array.from(article.children);
  let tagIndex = null;
  const sections = [];

  nodes.forEach((node, index) => {
    if (node.tagName === tagName) {
      if (tagIndex) {
        sections.push(nodes.slice(tagIndex, index));
      }

      tagIndex = index;
    }
  });

  if (tagIndex !== null) {
    sections.push(nodes.slice(tagIndex));
    tagIndex = null;
  }

  sections.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.id = parseAnchorID(section[0].textContent);
    sectionElement.className = tagName.toLowerCase();
    sectionElement.append(...section);
    console.log(sectionElement);
    article.append(sectionElement);
  });
};

const splitSections = () => {
  splitH1Section("H3");
  splitH1Section("H2");
  splitH1Section("H1");
};

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

const renderAnchors = () => {
  const mainElement = $("main article");
  const navElement = createElement(".template-nav-anchor", "nav");

  const anchorList = mainElement.querySelectorAll("section");
  anchorList.forEach((anchor) => {
    const anchorLi = createElement(".template-anchor", "li");
    anchorLi.querySelector("a").textContent = anchor.children[0].textContent;
    anchorLi.querySelector("a").href = `#${anchor.id}`;
    anchorLi.querySelector("a").className = anchor.className;
    navElement.querySelector("ul").append(anchorLi);
  });

  $("aside").append(navElement);
};

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

const renderPostContent = (post) => {
  const mainElement = $("main article");
  document.title = post.title.toUpperCase();

  const html = post.html;
  const replacedHtml = replaceCheckbox(html);
  mainElement.insertAdjacentHTML("afterbegin", replacedHtml);
};

export const renderHeader = () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const aside = $("aside");
  const media = matchMedia("(min-width: 40rem)");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display");
    aside.classList.toggle("open");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
  media.addEventListener("change", () => {
    if (media.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("display");
      aside.classList.remove("open");
    }
  });
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
      targetEl.classList.remove("display");
    } else {
      targetEl.classList.add("display");
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

export const renderPostPage = (post) => {
  renderPostContent(post);
  renderHeader();
  splitSections();
  renderAnchors();
  renderImage(post);
  renderGithubIcon(post.html_url);
  renderUpToTop();
  renderContentCopy();
  removeLoadingSpinner();
};
