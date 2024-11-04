import { renderLayout } from "./renderLayout";
import { removeLoadingSpinner } from "./renderLoadingSpinner";
import { renderPosts } from "./renderPosts";
import { renderTags } from "./renderTags";

export const render = (posts, tags) => {
  renderLayout();
  renderTags(posts, tags);
  renderPosts(posts);
  removeLoadingSpinner();
};
