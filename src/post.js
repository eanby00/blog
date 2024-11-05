import { renderPost } from "./UI/renderPost";
import { getDataFromURL } from "./Util/getDataFromURL";

const init = () => {
  const post = getDataFromURL();
  renderPost(post);
};

init();
