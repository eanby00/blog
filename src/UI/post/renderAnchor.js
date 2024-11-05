import { $, $All, createElement } from "../../Util/Helper";

export const renderAnchors = () => {
  const mainElement = $("main article");
  const navElement = createElement(".template-nav-anchor", "nav");

  const anchorList = $All("section", mainElement);
  anchorList.forEach(({ children, id, className }) => {
    const anchorLi = createElement(".template-anchor", "li");
    $("a", anchorLi).textContent = children[0].textContent;
    $("a", anchorLi).href = `#${id}`;
    $("a", anchorLi).className = className;
    $("ul", navElement).append(anchorLi);

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
