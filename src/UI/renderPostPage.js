import { $ } from "../Util/Helper";
import { renderAnchors } from "./renderAnchor";
import {
  renderContentCopy,
  renderGithubIcon,
  renderUpToTop,
} from "./renderIcons";
import { removeLoadingSpinner } from "./renderLoadingSpinner";
import { renderImage, renderPostContent } from "./renderPostContent";
import { renderSections } from "./renderSections";

const renderHeader = () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const aside = $("aside");
  const media = matchMedia("(min-width: 40rem)");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display");
    aside.classList.toggle("open");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
  media.addEventListener("change", () => {
    if (media.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("display");
      aside.classList.remove("open");
    }
  });
};

export const renderPostPage = (post) => {
  renderPostContent(post);
  renderHeader();
  renderSections();
  renderAnchors();
  renderImage(post);
  renderGithubIcon(post.html_url);
  renderUpToTop();
  renderContentCopy();
  removeLoadingSpinner();
};
