import { $, createElement } from "../Util/Helper";

const createPostElement = ({ title, date, description }) => {
  const postElement = createElement(".template-post", "section");
  postElement.querySelector("h2").textContent = title;
  postElement.querySelector(".post-date").textContent = date;
  postElement.querySelector(".post-description").textContent =
    description || `${title}에 관한 포스트`;
  return postElement;
};

export const renderPosts = (posts) => {
  const postContainer = $(".post-container");

  postContainer.replaceChildren();
  posts.forEach((post) => {
    postContainer.append(createPostElement(post));
  });
};
