import { getPostsAndTags } from "./Util/getPostsAndTags";
import { renderTags } from "./render/renderTag";

const init = async () => {
  const mobileTagIcon = document.querySelector(".mobile-menu");
  const backdrop = document.querySelector(".backdrop");

  const toggleMenu = () => {
    const tagContainer = document.querySelector(".tag-container");

    tagContainer.classList.toggle("display-tag");
    backdrop.classList.toggle("display-block");
    mobileTagIcon.classList.toggle("open");
  };

  mobileTagIcon.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);

  const { posts, tags } = getPostsAndTags();
  console.log(posts);
  console.log(tags);
  renderTags(tags);
};

init();
