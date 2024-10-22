import { getDataFromURL } from "./Util/getDataFromURL";

const init = () => {
  const post = getDataFromURL();
  document.title = post.title.toUpperCase();
};

init();
