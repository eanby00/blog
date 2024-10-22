import { renderPostPage } from "./UI/renderPostPage";
import { getDataFromURL } from "./Util/getDataFromURL";

const init = () => {
  const post = getDataFromURL();
  renderPostPage(post);
};

init();
