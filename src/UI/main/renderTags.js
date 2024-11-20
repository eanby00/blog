import { $, createElement, hasClass } from "../../Util/Helper";
import { renderPosts } from "./renderPosts";

const getSelectedTags = (tagElement) => {
  const tags = Array.from(tagElement.closest("nav").children);
  return tags.filter((tag) => hasClass(tag, "selected"));
};

const isSelectedTag = (tags, tagElement) => {
  return tags[0]?.textContent === tagElement.textContent;
};

const removeSelectedTag = (tags) => {
  tags.forEach((tag) => {
    tag.classList.remove("selected");
  });
};

const filterPosts = (tagElement, posts) => {
  const selectedTags = getSelectedTags(tagElement);
  if (isSelectedTag(selectedTags, tagElement)) {
    selectedTags[0].classList.remove("selected");
    return posts;
  }

  removeSelectedTag(selectedTags);
  tagElement.classList.add("selected");
  return posts.filter((post) => post.tag === tagElement.textContent);
};

const selectTag = (posts, event) => {
  const tagElement = event.target;
  if (hasClass(tagElement, "tag-container")) return;

  renderPosts(filterPosts(tagElement, posts));
};

const createTagElement = (tag) => {
  const tagElement = createElement(".template-tag", "div");
  tagElement.textContent = tag;
  return tagElement;
};

export const renderTags = (posts, tags) => {
  const tagContainer = $(".tag-container");

  tags.forEach((tag) => {
    tagContainer.append(createTagElement(tag));
  });

  tagContainer.addEventListener("click", selectTag.bind(null, posts));
};
