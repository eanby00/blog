import { $ } from "../Util/Helper";

export const renderHeader = () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const tagContainer = $(".tag-container");
  const media = matchMedia("(min-width: 40rem)");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("open");
    tagContainer.classList.toggle("display-tag");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
  media.addEventListener("change", () => {
    if (media.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("open");
      tagContainer.classList.remove("display-tag");
    }
  });
};
