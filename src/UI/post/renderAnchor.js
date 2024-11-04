import { $, createElement } from "../../Util/Helper";

export const renderAnchors = () => {
  const mainElement = $("main article");
  const navElement = createElement(".template-nav-anchor", "nav");

  const anchorList = mainElement.querySelectorAll("section");
  anchorList.forEach((anchor) => {
    const anchorLi = createElement(".template-anchor", "li");
    anchorLi.querySelector("a").textContent = anchor.children[0].textContent;
    anchorLi.querySelector("a").href = `#${anchor.id}`;
    anchorLi.querySelector("a").className = anchor.className;
    navElement.querySelector("ul").append(anchorLi);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anchorLi.classList.add("open");
        } else {
          anchorLi.classList.remove("open");
        }
      });
    });

    observer.observe($(`section#${anchor.id}`));
  });

  $("aside").append(navElement);
};
