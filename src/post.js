import { renderPost } from "./UI/renderPost";
import { getDataFromURL, getDomainURL } from "./Util/getDataFromURL";

const init = () => {
  try {
    const post = getDataFromURL();
    renderPost(post);
  } catch (error) {
    location.href = getDomainURL();
  }
};

init();
