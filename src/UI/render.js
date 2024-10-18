import { renderHeader } from "./renderHeader";
import { removeLoadingSpinner } from "./renderLoadingSpinner";
import { renderPosts } from "./renderPosts";
import { renderTags } from "./renderTags";

export const render = (posts, tags) => {
  renderHeader();
  renderTags(posts, tags);
  renderPosts(posts);
  removeLoadingSpinner();
};
