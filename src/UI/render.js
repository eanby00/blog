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

  const resetSelectedTag = (tagElement) => {
    const tags = Array.from(tagElement.closest("nav").children);
    tags.forEach((tag) => {
      tag.classList.remove("tag-open");
    });
  };

  const resetFilteredPosts = () => {
    filteredPosts = [...posts];
    selectedTag = "";
  };

  const filterPosts = (tagElement) => {
    filteredPosts = posts.filter((post) => post.tag === tagElement.textContent);
    selectedTag = tagElement.textContent;
    tagElement.classList.add("tag-open");
  };

  const selectTag = (event) => {
    const tagElement = event.target;
    if (!tagElement.tagName === "DIV") {
      return;
    }

    resetSelectedTag();
    if (selectedTag === tagElement.textContent) {
      resetFilteredPosts();
    } else {
      filterPosts(tagElement);
    }
    renderPosts(filteredPosts);
    console.log(filteredPosts);
  };

  const renderTags = (tags) => {
    const tagContainer = document.querySelector(".tag-container");
    const tagTemplate = document.querySelector(".template-tag");
    tagContainer.addEventListener("click", selectTag);

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
