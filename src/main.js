import { render } from "./UI/render";
import { getPostsAndTags } from "./Util/getPostsAndTags";

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

  const { posts, tags } = await getPostsAndTags();
  console.log(posts);
  console.log(tags);
  render(posts, tags);
};

init();
