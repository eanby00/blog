import { renderLayout } from "./renderLayout";
import { removeLoadingSpinner } from "./renderLoadingSpinner";
import { renderPost } from "./renderPost";

export const renderPostPage = (post) => {
  renderPost(post);
  renderLayout("aside", post.html_url);
  removeLoadingSpinner();
};
