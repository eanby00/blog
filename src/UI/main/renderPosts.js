import { $, createElement } from "../../Util/Helper";

const changeURLToPost = (event) => {
  const id = event.target.closest("section").dataset.id;
  const isLocal = location.href.includes("index.html");
  isLocal
    ? (location.href = `${location.href.replace(
        "index.html",
        ""
      )}post/index.html?id=${id}`)
    : (location.href = `${location.href}post/?id=${id}`);
};

const createPostElement = ({ id, title, date, description }) => {
  const postElement = createElement(".template-post", "section");
  postElement.dataset.id = id;
  $("h2", postElement).textContent = title;
  if (date) {
    $(".post-date", postElement).textContent = date;
  } else {
    $(".post-date", postElement).remove();
  }
  $(".post-description", postElement).textContent =
    description || `${title}에 관한 포스트`;

  postElement.addEventListener("click", changeURLToPost);
  return postElement;
};

export const renderPosts = (posts) => {
  const postContainer = $(".post-container");

  postContainer.replaceChildren();
  posts.forEach((post) => {
    postContainer.append(createPostElement(post));
  });
};
