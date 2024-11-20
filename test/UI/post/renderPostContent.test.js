/**
 * @jest-environment jsdom
 */

import * as anchor from "../../../src/UI/post/renderAnchor";
import * as contentCopy from "../../../src/UI/post/renderContentCopy";
import { renderPostContent } from "../../../src/UI/post/renderPostContent";
import * as section from "../../../src/UI/post/renderSections";
import { $All } from "../../../src/Util/Helper";

anchor.renderAnchors = jest.fn();
contentCopy.renderContentCopy = jest.fn();
section.renderSections = jest.fn();

document.body.innerHTML = `<article class="content-container"></article>`;

const mockedHTML = `
      <h1>test</h1>
      <blockquote>
        <p>test 테스트 메시지</p>
      </blockquote>
      <h2>test 1</h2>
      <img src="./test 1.png" alt="img1">
      <ul>
        <li>test1 테스트 메시지</li>
      </ul>
      <h2>test&11</h2>
      <img src="./test 2.png" alt="img1">
      <ul>
        <li>test11 테스트 메시지 1</li>
        <li>test11 테스트 메시지 2</li>
        <li>test11 테스트 메시지 3</li>
      </ul>
      <img src="./test 3.png" alt="img1">
`;

const mockedPost = {
  title: "test",
  html: mockedHTML,
  images: [
    { name: "test 1.png", type: "png", content: "test1" },
    { name: "test 2.png", type: "png", content: "test2" },
  ],
};

describe("renderPostContent 체크", () => {
  renderPostContent(mockedPost);

  test("기본 동작 확인", () => {
    const container = $All(".content-container");
    const h1 = $All("h1");
    const h2 = $All("h2");
    const img = $All("img");

    expect(container).toHaveLength(1);
    expect(h1).toHaveLength(1);
    expect(h2).toHaveLength(2);
    expect(img).toHaveLength(2);
  });

  test("image render 확인", () => {
    const [img1, img2] = $All("img");
    expect(img1.id).toEqual("test 1.png");
    expect(img2.id).toEqual("test 2.png");
  });
});
