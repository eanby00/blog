import { $, createElement } from "../../Util/Helper";

export const renderAnchors = () => {
  const mainElement = $("main article");
  const navElement = createElement(".template-nav-anchor", "nav");

  const anchorList = mainElement.querySelectorAll("section");
  anchorList.forEach(({ children, id, className }) => {
    const anchorLi = createElement(".template-anchor", "li");
    anchorLi.querySelector("a").textContent = children[0].textContent;
    anchorLi.querySelector("a").href = `#${id}`;
    anchorLi.querySelector("a").className = className;
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

    observer.observe($(`section#${id}`));
  });

  $("aside").append(navElement);
};
