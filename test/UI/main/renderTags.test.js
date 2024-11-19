/**
 * @jest-environment jsdom
 */

import * as post from "../../../src/UI/main/renderPosts";
import { renderTags } from "../../../src/UI/main/renderTags";
import { $, $All } from "../../../src/Util/Helper";

post.renderPosts = jest.fn((posts) => posts.length);

document.body.innerHTML = `
    <template class="template-tag">
      <div class="tag card"></div>
    </template>
    <nav class="tag-container"></nav>
`;

const mockPosts = [
  {
    id: 1,
    title: "test1",
    date: "2024.01.01.",
    description: "test description 1",
    tag: "test1",
  },
  {
    id: 2,
    title: "test2",
    description: "test description 2",
    tag: "test1",
  },
  {
    id: 3,
    title: "test3",
    date: "2024.03.01.",
    tag: "test1",
  },
  {
    id: 4,
    title: "test4",
    date: "2024.04.01.",
    description: "test description 4",
    tag: "test2",
  },
];

const mockTags = ["test1", "test2"];

renderTags(mockPosts, mockTags);

describe("createTagElement 체크", () => {
  test("기본 작동 확인", () => {
    const tags = $All(".tag");

    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toEqual("test1");
    expect(tags[1].textContent).toEqual("test2");
  });
});

describe("selectTag 체크", () => {
  const tagContainer = $(".tag-container");
  const tags = $All(".tag");

  test("태그 컨테이너가 클릭되었을 경우", () => {
    tagContainer.click();
    expect(post.renderPosts).not.toHaveBeenCalled();
  });

  test("test1 태그가 클릭되었을 경우", () => {
    tags[0].click();
    expect(post.renderPosts).toHaveReturnedWith(3);
  });

  test("test2 태그가 클릭되었을 경우", () => {
    tags[1].click();
    expect(post.renderPosts).toHaveReturnedWith(1);
  });

  test("선택된 태그가 다시 선택되는 경우 : 선택 해제", () => {
    tags[1].click();
    expect(post.renderPosts).toHaveReturnedWith(4);
  });
});
