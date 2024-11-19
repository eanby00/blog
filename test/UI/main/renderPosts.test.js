/**
 * @jest-environment jsdom
 */

import { renderPosts } from "../../../src/UI/main/renderPosts";
import { $ } from "../../../src/Util/Helper";

const mockResponse = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

document.body.innerHTML = `
    <template class="template-post">
      <section class="post card">
        <h2></h2>
        <p class="post-date"></p>
        <p class="post-description"></p>
      </section>
    </template>

    <main class="post-container"></main>
`;

const mockPosts = [
  {
    id: 1,
    title: "test1",
    date: "2024.01.01.",
    description: "test description 1",
  },
  {
    id: 2,
    title: "test2",
    description: "test description 2",
  },
  {
    id: 3,
    title: "test3",
    date: "2024.03.01.",
  },
  {
    id: 4,
    title: "test4",
    date: "2024.04.01.",
    description: "test description 4",
  },
];

renderPosts(mockPosts);

describe("createPostElement 체크", () => {
  test("기본 작동 확인", () => {
    const post = $(".post-container .post");
    expect(post.dataset.id).toEqual("1");
    expect($("h2", post).textContent).toEqual("test1");
    expect($(".post-date", post).textContent).toEqual("2024.01.01.");
    expect($(".post-description", post).textContent).toEqual(
      "test description 1"
    );
  });
});

describe("changeURLToPost 체크", () => {
  test("개발자 환경에서 작동 확인", () => {
    location.href = "http://localhost:8080/";
    const post = $(".post-container .post");
    post.click();

    expect(location.href).toEqual("http://localhost:8080/post/?id=1");
  });

  test("로컬 모드에서 작동 확인", () => {
    location.href = "http://127.0.0.1:5500/public/index.html";
    const post = $(".post-container .post");
    post.click();

    expect(location.href).toEqual(
      "http://127.0.0.1:5500/public/post/index.html?id=1"
    );
  });
});
