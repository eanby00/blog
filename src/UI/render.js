import { renderLayout } from "./layout/renderLayout";
import { removeLoadingSpinner } from "./layout/renderLoadingSpinner";
import { renderPosts } from "./main/renderPosts";
import { renderTags } from "./main/renderTags";

export const render = (posts, tags) => {
  renderLayout(".tag-container");
  renderTags(posts, tags);
  renderPosts(posts);
  removeLoadingSpinner();
};
