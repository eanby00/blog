import { $ } from "../Util/Helper";

export const renderHeader = () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const tagContainer = $(".tag-container");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display-block");
    tagContainer.classList.toggle("display-tag");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
};
