import { renderLayout } from "./layout/renderLayout";
import { removeLoadingSpinner } from "./layout/renderLoadingSpinner";
import { renderPostContent } from "./post/renderPostContent";

export const renderPost = (post) => {
  renderLayout(".anchor-container", post.html_url);
  renderPostContent(post);
  removeLoadingSpinner();
};
