import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

export const getHTMLFromMD = (rawMD) => {
  return unified().use(markdown).use(remarkRehype).use(html).processSync(rawMD);
};

export const getElementTreeFromMd = (rawMD) => {
  return unified().use(markdown).parse(rawMD);
};
