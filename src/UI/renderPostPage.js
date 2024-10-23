import { $ } from "../Util/Helper";

const parseAnchorID = (textContent) => {
  return textContent
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(",", "")
    .replaceAll("&", "")
    .replaceAll(".", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("=", "")
    .replaceAll("~", "");
};

const setAnchorID = (tag) => {
  tag.id = parseAnchorID(tag.textContent);
};

const setAnchor = () => {
  const mainElement = $("main");
  const h1s = mainElement.querySelectorAll("h1");
  h1s.forEach(setAnchorID);
  const h2s = mainElement.querySelectorAll("h2");
  h2s.forEach(setAnchorID);
  const h3 = mainElement.querySelectorAll("h3");
  const h4 = mainElement.querySelectorAll("h4");
  const h5 = mainElement.querySelectorAll("h5");
  const h6 = mainElement.querySelectorAll("h6");
};

const renderPostContent = (post) => {
  const mainElement = $("main");
  document.title = post.title.toUpperCase();

  const html = post.html;
  mainElement.insertAdjacentHTML("beforeend", html);
};

export const renderPostPage = (post) => {
  renderPostContent(post);
  setAnchor();

  // const indexs = document.querySelectorAll("ul li a");
  // console.log(indexs);

  // const anchors = document.querySelectorAll(".anchor");
  // console.log(anchors);
  // anchors.forEach((anchor) => {
  //   anchor.closest("div").id = anchor.href.split("#")[1];
  // });
};
