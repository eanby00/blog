import { $ } from "../Util/Helper";
import { renderPosts } from "./renderPosts";

const getSelectedTag = (tagElement) => {
  const tags = Array.from(tagElement.closest("nav").children);
  return tags.filter((tag) => tag.classList.contains("tag-open"));
};

const isSelectedTag = (tags, tagElement) => {
  return tags[0]?.textContent === tagElement.textContent;
};

const removeSelectedTag = (tags) => {
  tags.forEach((tag) => {
    tag.classList.remove("tag-open");
  });
};

const filterPosts = (tagElement, posts) => {
  const selectedTags = getSelectedTag(tagElement);
  if (isSelectedTag(selectedTags, tagElement)) {
    selectedTags[0].classList.remove("tag-open");
    return posts;
  }

  removeSelectedTag(selectedTags);
  tagElement.classList.add("tag-open");
  return posts.filter((post) => post.tag === tagElement.textContent);
};

const selectTag = (posts, event) => {
  const tagElement = event.target;
  if (tagElement.classList.contains("tag-container")) {
    return;
  }

  const filteredPosts = filterPosts(tagElement, posts);
  renderPosts(filteredPosts);
};

export const renderTags = (posts, tags) => {
  const tagContainer = $(".tag-container");

  tags.forEach((tag) => {
    const tagElement = document
      .importNode($(".template-tag").content, true)
      .querySelector("div");
    tagElement.textContent = tag;

    tagContainer.append(tagElement);
  });

  tagContainer.addEventListener("click", selectTag.bind(null, posts));
};
