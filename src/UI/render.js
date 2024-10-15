export const render = (posts, tags) => {
  let filteredPosts = [...posts];
  let selectedTag = "";

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

  const selectTag = (tagElement, tag) => {};

  const renderTags = (tags) => {
    const tagContainer = document.querySelector(".tag-container");
    const tagTemplate = document.querySelector(".template-tag");
    tagContainer.addEventListener("click", (event) => {
      if (!event.target.tagName === "DIV") {
        return;
      }

      Array.from(event.target.closest("nav").children).forEach((tag) => {
        tag.classList.remove("tag-open");
      });
      if (selectedTag === event.target.textContent) {
        filteredPosts = [...posts];
      } else {
        filteredPosts = posts.filter(
          (post) => post.tag === event.target.textContent
        );
        selectedTag = event.target.textContent;
        event.target.classList.add("tag-open");
      }
      renderPosts(filteredPosts);
      console.log(filteredPosts);
    });

    tags.forEach((tag) => {
      const tagElement = document
        .importNode(tagTemplate.content, true)
        .querySelector("div");
      tagElement.textContent = tag;

      tagContainer.append(tagElement);
    });
  };

  const renderPosts = (posts) => {};

  renderHeader();
  renderTags(tags);
  renderPosts(filteredPosts);
};
