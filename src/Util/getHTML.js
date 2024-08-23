import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

const findDescription = (data) => {
  if (!data.type) {
    return "";
  } else if (data.type === "text") {
    return data.value;
  } else {
    return findDescription(data.children[0]);
  }
};

export const getHTMLFromMD = (rawMD) => {
  return unified().use(markdown).use(remarkRehype).use(html).processSync(rawMD)
    .value;
};

export const getElementTreeFromMd = (rawMD) => {
  return unified().use(markdown).parse(rawMD);
};

export const getDescription = (rawMD) => {
  const elementTree = getElementTreeFromMd(rawMD);
  const blockquoteElements = elementTree.children.filter(
    (element) => element.type === "blockquote"
  );

  if (blockquoteElements.length === 0) {
    return "";
  }

  return findDescription(blockquoteElements[0]);
};
