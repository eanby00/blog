import { getPostsAndTags } from "./Util/getPostsAndTag";

const mobileTagIcon = document.querySelector(".mobile-menu");
const backdrop = document.querySelector(".backdrop");

const toggleMobileMenu = () => {
  const tagContainer = document.querySelector(".tag-container");

  tagContainer.classList.toggle("display-tag");
  backdrop.classList.toggle("display-block");
  mobileTagIcon.classList.toggle("open");
};

mobileTagIcon.addEventListener("click", toggleMobileMenu);
backdrop.addEventListener("click", toggleMobileMenu);

const { posts, tags } = getPostsAndTags();
console.log(posts, tags);
