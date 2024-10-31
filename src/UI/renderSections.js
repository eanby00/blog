import { INDEX_ANCHOR } from "../constants/MD";
import { $ } from "../Util/Helper";

const splitSection = () => {
  const article = $("main article");
  const nodes = Array.from(article.children);
  let tagIndex = null;
  const sections = [];

  nodes.forEach((node, index) => {
    if (
      node.tagName === "H1" ||
      node.tagName === "H2" ||
      node.tagName === "H3"
    ) {
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

    if (text in INDEX_ANCHOR.REMOVE_TEXT_LIST) {
      return "";
    }

    return text;
  });

  return replacedText.join("");
};

const renderSection = (sections) => {
  const article = $("main article");

  sections.forEach((section) => {
    const sectionElement = document.createElement("section");
    const id = parseSectionId(section[0].textContent);
    sectionElement.id = id;
    sectionElement.className = section[0].tagName.toLowerCase();
    sectionElement.append(...section);

    article.append(sectionElement);
  });
};

export const renderSections = () => {
  const sections = splitSection();
  renderSection(sections);
};
