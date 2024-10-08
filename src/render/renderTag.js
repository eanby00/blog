export const renderTags = (tags) => {
  const tagContainer = document.querySelector(".tag-container");
  const tagTemplate = document.querySelector(".tag");
  console.log("entered renderTags");

  tags.forEach((tag) => {
    const tagElement = document.importNode(tagTemplate.content, true);
    tagElement.querySelector("div").textContent = tag;

    tagContainer.append(tagElement);
  });
};
