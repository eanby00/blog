import { $, createElement } from "../Util/Helper";

export const renderAnchors = () => {
  const mainElement = $("main article");
  const navElement = createElement(".template-nav-anchor", "nav");

  const anchorList = mainElement.querySelectorAll("section");
  anchorList.forEach((anchor) => {
    const anchorLi = createElement(".template-anchor", "li");
    anchorLi.querySelector("a").textContent = anchor.children[0].textContent;
    anchorLi.querySelector("a").href = `#${anchor.id}`;
    anchorLi.querySelector("a").className = anchor.className;
    anchorLi.className = anchor.id;
    navElement.querySelector("ul").append(anchorLi);
  });

  $("aside").append(navElement);
};
