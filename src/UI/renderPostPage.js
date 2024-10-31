import { removeLoadingSpinner } from "./renderLoadingSpinner";
import { renderPost } from "./renderPost";
import { renderPostLayout } from "./renderPostLayout";

export const renderPostPage = (post) => {
  renderPost(post);
  renderPostLayout(post);
  removeLoadingSpinner();
};
