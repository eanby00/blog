import { $ } from "../Util/Helper";
import { renderHeader } from "./renderHeader";
import { removeLoadingSpinner } from "./renderLoadingSpinner";

export const render = (posts, tags) => {
  const tagContainer = $(".tag-container");
  const postContainer = $(".post-container");
  const tagTemplate = $(".template-tag");
  const postTemplate = $(".template-post");

  let filteredPosts = [...posts];
  let selectedTag = "";

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

  const renderPosts = (posts) => {
    postContainer.replaceChildren();
    posts.forEach((post) => {
      const postElement = document
        .importNode(postTemplate.content, true)
        .querySelector("section");
      postElement.querySelector("h2").textContent = post.title;
      postElement.querySelector(".post-date").textContent = post.date;
      postElement.querySelector(".post-description").textContent =
        post.description || `${post.title}에 관한 포스트`;

      postContainer.append(postElement);
    });
  };

  renderHeader();
  renderTags(tags);
  renderPosts(filteredPosts);
  removeLoadingSpinner();
};
