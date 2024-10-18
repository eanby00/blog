import { $ } from "../Util/Helper";

export const renderPosts = (posts) => {
  const postContainer = $(".post-container");

  postContainer.replaceChildren();
  posts.forEach((post) => {
    const postElement = document
      .importNode($(".template-post").content, true)
      .querySelector("section");
    postElement.querySelector("h2").textContent = post.title;
    postElement.querySelector(".post-date").textContent = post.date;
    postElement.querySelector(".post-description").textContent =
      post.description || `${post.title}에 관한 포스트`;

    postContainer.append(postElement);
  });
};
