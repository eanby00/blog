import { renderPost } from "./UI/renderPost";
import { getDataFromURL, makeDomainUrl } from "./Util/getDataFromURL";

const init = () => {
  try {
    const post = getDataFromURL();
    renderPost(post);
  } catch (error) {
    location.href = makeDomainUrl(location.href);
    console.log(error);
  }
};

init();
