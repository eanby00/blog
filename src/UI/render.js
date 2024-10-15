export const render = (posts, tags) => {
  let filteredPosts = [...posts];

  const renderHeader = () => {
    const mobileTagIcon = document.querySelector(".mobile-menu");
    const backdrop = document.querySelector(".backdrop");

    const toggleMenu = () => {
      const tagContainer = document.querySelector(".tag-container");

      tagContainer.classList.toggle("display-tag");
      backdrop.classList.toggle("display-block");
      mobileTagIcon.classList.toggle("open");
    };

    mobileTagIcon.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", toggleMenu);
  };

  const renderTags = (tags) => {
    const tagContainer = document.querySelector(".tag-container");
    const tagTemplate = document.querySelector(".template-tag");

    tags.forEach((tag) => {
      const tagElement = document
        .importNode(tagTemplate.content, true)
        .querySelector("div");
      tagElement.textContent = tag;
      tagElement.addEventListener("click", () => {
        filteredPosts = posts.filter((post) => post.tag === tag);
        renderPosts(filteredPosts);
      });

      tagContainer.append(tagElement);
    });
  };

  const renderPosts = (posts) => {};

  renderHeader();
  renderTags(tags);
  renderPosts(filteredPosts);
};
