import { INDEX_ANCHOR } from "../../constants/MD";
import { $ } from "../../Util/Helper";

const splitSection = () => {
  const article = $(".content-container");
  const nodes = Array.from(article.children);
  let tagIndex = null;
  const sections = [];

  nodes.forEach(({ tagName }, index) => {
    if (tagName === "H1" || tagName === "H2" || tagName === "H3") {
      if (tagIndex !== null) {
        sections.push(nodes.slice(tagIndex, index));
      }

      tagIndex = index;
    }
  });
  sections.push(nodes.slice(tagIndex));

  return sections;
};

const parseSectionId = (textContent) => {
  const textList = textContent.toLowerCase().split("");
  const replacedText = textList.map((text) => {
    if (text === " ") {
      return "-";
    }

    if (INDEX_ANCHOR.REMOVE_TEXT_LIST.includes(text)) {
      return "";
    }

    return text;
  });

  return replacedText.join("");
};

const renderSection = (sections) => {
  const article = $(".content-container");

  sections.forEach((section) => {
    const sectionElement = document.createElement("section");
    const header = section[0];
    const id = parseSectionId(header.textContent);
    sectionElement.id = id;
    sectionElement.className = header.tagName.toLowerCase();
    sectionElement.append(...section);

    article.append(sectionElement);
  });
};

export const renderSections = () => {
  const sections = splitSection();
  renderSection(sections);
};
