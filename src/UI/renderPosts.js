import { $, createElement } from "../Util/Helper";

const changeURLToPost = (event) => {
  const title = event.target.closest("section").querySelector("h2").textContent;
  location.href = `${location.href}post/?title=${title}`;
};

const createPostElement = (post) => {
  const postElement = createElement(".template-post", "section");
  postElement.querySelector("h2").textContent = post.title;
  postElement.querySelector(".post-date").textContent = post.date;
  postElement.querySelector(".post-description").textContent =
    post.description || `${post.title}에 관한 포스트`;

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
