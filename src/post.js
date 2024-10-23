import { renderPostPage } from "./UI/renderPostPage";
import { getDataFromURL } from "./Util/getDataFromURL";

const init = () => {
  const post = getDataFromURL();
  renderPostPage(post);

  const indexs = document.querySelectorAll("ul li a");
  console.log(indexs);

  const anchors = document.querySelectorAll(".anchor");
  console.log(anchors);
  anchors.forEach((anchor) => {
    anchor.closest("div").id = anchor.href.split("#")[1];
  });
};

init();
