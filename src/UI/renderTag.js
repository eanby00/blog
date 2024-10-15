export const renderTags = (tags) => {
  const tagContainer = document.querySelector(".tag-container");
  const tagTemplate = document.querySelector(".template-tag");

  tags.forEach((tag) => {
    const tagElement = document.importNode(tagTemplate.content, true);
    tagElement.querySelector("div").textContent = tag;
    tagElement.querySelector("div").addEventListener("click", () => {
      console.log(tag);
    });

    tagContainer.append(tagElement);
  });
};