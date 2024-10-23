import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

export const getHTMLFromMD = (rawMD) => {
  console.log(rawMD);
  return unified().use(markdown).use(remarkRehype).use(html).processSync(rawMD)
    .value;
};

const getElementTreeFromMd = (rawMD) => {
  return unified().use(markdown).parse(rawMD);
};

const findDescription = (data) => {
  if (!data.type) {
    return "";
  }
  if (data.type === "text") {
    return data.value;
  }
  return findDescription(data.children[0]);
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
