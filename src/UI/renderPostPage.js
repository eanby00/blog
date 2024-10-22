import { $ } from "../Util/Helper";

export const renderPostPage = (post) => {
  const mainElement = $("main");
  document.title = post.title.toUpperCase();
  mainElement.insertAdjacentHTML("beforeend", post.html);
};
