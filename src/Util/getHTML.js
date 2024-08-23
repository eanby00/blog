import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

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
    return;
  }

  return blockquoteElements[0].children[0].children[0].type === "text"
    ? blockquoteElements[0].children[0].children[0].value
    : "";
};
