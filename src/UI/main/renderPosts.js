import { $, createElement } from "../../Util/Helper";

const changeURLToPost = (event) => {
  const id = event.target.closest("section").dataset.id;
  location.href = `${location.href}post/?id=${id}`;
};

const createPostElement = ({ id, title, date, description }) => {
  const postElement = createElement(".template-post", "section");
  postElement.dataset.id = id;
  postElement.querySelector("h2").textContent = title;
  postElement.querySelector(".post-date").textContent = date;
  postElement.querySelector(".post-description").textContent =
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
