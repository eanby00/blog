import { $ } from "../Util/Helper";

export const render = (posts, tags) => {
  const mobileTagIcon = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const tagContainer = $(".tag-container");
  const tagTemplate = $(".template-tag");

  let filteredPosts = [...posts];
  let selectedTag = "";

  const toggleMenu = () => {
    tagContainer.classList.toggle("display-tag");
    backdrop.classList.toggle("display-block");
    mobileTagIcon.classList.toggle("open");
  };

  const renderHeader = () => {
    mobileTagIcon.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", toggleMenu);
  };

  const resetSelectedTag = (tagElement) => {
    const tags = Array.from(tagElement.closest("nav").children);
    tags.forEach((tag) => {
      tag.classList.remove("tag-open");
    });
  };

  const resetFilteredPosts = () => {
    filteredPosts = [...posts];
    selectedTag = "";
  };

  const filterPosts = (tagElement) => {
    filteredPosts = posts.filter((post) => post.tag === tagElement.textContent);
    selectedTag = tagElement.textContent;
    tagElement.classList.add("tag-open");
  };

  const selectTag = (event) => {
    const tagElement = event.target;
    if (tagElement.classList.contains("tag-container")) {
      return;
    }

    resetSelectedTag(tagElement);
    if (selectedTag === tagElement.textContent) {
      resetFilteredPosts();
    } else {
      filterPosts(tagElement);
    }
    renderPosts(filteredPosts);
    console.log(filteredPosts);
  };

  const renderTags = (tags) => {
    tags.forEach((tag) => {
      const tagElement = document
        .importNode(tagTemplate.content, true)
        .querySelector("div");
      tagElement.textContent = tag;

      tagContainer.append(tagElement);
    });
    tagContainer.addEventListener("click", selectTag);
  };

  const renderPosts = (posts) => {};

  renderHeader();
  renderTags(tags);
  renderPosts(filteredPosts);
};
