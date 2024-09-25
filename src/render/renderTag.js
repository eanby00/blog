const copyTagTemplate = () => {
  const template = document.querySelector(".tag");
  return document.importNode(template.content, true);
};

export const renderTags = (tags) => {
  const tagContainer = document.querySelector(".tag-container");
  console.log("entered renderTags");

  tags.forEach((tag) => {
    console.log(tag);
    // body.querySelector("div").textContent = "테스트 이름";

    // tagContainer.append(body);
  });
};
