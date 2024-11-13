import {
  connectImages,
  formatDate,
  getData,
  getDatas,
  getDate,
  getPath,
  getRawPosts,
  getTag,
  getTags,
  modifyImage,
  modifyPost,
  sortPosts,
} from "../../src/Util/getData";

jest.mock("octokit");
jest.mock("../../src/Util/request");
jest.mock("../../src/Util/getHTML");
jest.mock("../../src/constants/API");
jest.mock("../../src/store/store");

// describe("getTag 체크", () => {
//   test("올바른 경우", () => {
//     const test = getTag("test/test1/test2");
//     expect(test).toEqual("test1");
//   });
// });

// describe("getPath 체크", () => {
//   test("올바른 경우", () => {
//     const test = getPath("test/test1/test2");
//     expect(test).toEqual("test/test1");
//   });
// });

// describe("getDate 체크", () => {
//   test("올바른 경우", async () => {
//     const test = await getDate("test");
//     expect(test).toEqual(new Date("2024-10-29T02:48:18.000Z"));
//   });
// });

// describe("formatDate 체크", () => {
//   const now = new Date();

//   const year = now.getFullYear();
//   let month = now.getMonth() + 1;
//   const date = now.getDate();

//   test("현재 시간을 기준으로 체크", () => {
//     const test = formatDate(now);
//     const answer = `${year}.${
//       month < 10 ? "0" + month.toString() : month
//     }.${date}.`;

//     expect(test).toEqual(answer);
//   });

//   test("현재 달이 만약 한 자리 수일 경우 체크", () => {
//     now.setMonth(5);
//     let month = now.getMonth() + 1;

//     const test = formatDate(now);
//     const answer = `${year}.${
//       month < 10 ? "0" + month.toString() : month
//     }.${date}.`;

//     expect(test).toEqual(answer);
//   });
// });

// describe("modifyPost 체크", () => {
//   test("올바르게 작동하는 경우1", async () => {
//     const mockedData = {
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test1/test2/test3/test.md",
//       name: "test.md",
//       html_url: "test html url",
//     };

//     const test = await modifyPost(mockedData);
//     expect(test.title).toEqual("test");
//     expect(test.tag).toEqual("test2");
//     expect(test.path).toEqual("test1/test2/test3");
//     expect(test.html_url).toEqual("test html url");
//   });

//   test("올바르게 작동하는 경우2", async () => {
//     const mockedData = {
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test4/test5/test6/test7.md",
//       name: "test7.md",
//       html_url: "test html_url",
//     };

//     const test = await modifyPost(mockedData);
//     expect(test.title).toEqual("test7");
//     expect(test.tag).toEqual("test5");
//     expect(test.path).toEqual("test4/test5/test6");
//     expect(test.html_url).toEqual("test html_url");
//   });
// });

// describe("modifyImage 체크", () => {
//   test("들어온 데이터가 md 파일인 경우", () => {
//     const mockedData = {
//       name: "test.md",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2/test.md",
//     };
//     const test = modifyImage(mockedData);
//     expect(test).toEqual({
//       name: "test.md",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2",
//       type: "md",
//     });
//   });

//   test("들어온 데이터가 png 파일인 경우", () => {
//     const mockedData = {
//       name: "test.png",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2/test.png",
//     };
//     const test = modifyImage(mockedData);
//     expect(test).toEqual({
//       name: "test.png",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2",
//       type: "png",
//     });
//   });

//   test("들어온 데이터가 jpg 파일인 경우", () => {
//     const mockedData = {
//       name: "test.jpg",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2/test.jpg",
//     };
//     const test = modifyImage(mockedData);
//     expect(test).toEqual({
//       name: "test.jpg",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2",
//       type: "jpg",
//     });
//   });

//   test("들어온 데이터가 webp 파일인 경우", () => {
//     const mockedData = {
//       name: "test.webp",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2/test.webp",
//     };
//     const test = modifyImage(mockedData);
//     expect(test).toEqual({
//       name: "test.webp",
//       content: "PGgxPnRlc3Q8L2gxPg==",
//       path: "test/test1/test2",
//       type: "webp",
//     });
//   });
// });

// describe("getRawPosts 체크", () => {
//   test("작동 체크", async () => {
//     const test = await getRawPosts("TEST");
//     expect(test.posts.length).toEqual(1);
//     expect(test.images.length).toEqual(1);

//     expect(test.posts[0].title).toEqual("TEST11");
//     expect(test.images[0].name).toEqual("TEST12.png");
//   });
// });

// describe("connectImages 체크", () => {
//   test("작동 체크", async () => {
//     const { posts, images } = await getRawPosts("TEST");
//     const test = connectImages(posts, images);

//     expect(test[0].title).toEqual("TEST11");
//     expect(test[0].images[0].name).toEqual("TEST12.png");
//   });
// });

// describe("sortPosts 체크", () => {
//   const answer = [
//     { date: "2024-11-14T06:44:21.207Z" },
//     { date: "2024-11-13T06:44:21.207Z" },
//     { date: "2024-11-12T06:44:21.207Z" },
//     { date: "2024-11-11T06:44:21.207Z" },
//     { date: "2024-11-10T06:44:21.207Z" },
//   ];

//   test("무작위 배열 동작 체크", () => {
//     const mockedDates = [
//       { date: "2024-11-12T06:44:21.207Z" },
//       { date: "2024-11-11T06:44:21.207Z" },
//       { date: "2024-11-13T06:44:21.207Z" },
//       { date: "2024-11-14T06:44:21.207Z" },
//       { date: "2024-11-10T06:44:21.207Z" },
//     ];
//     const test = sortPosts(mockedDates);
//     expect(test).toEqual(answer);
//   });

//   test("내림차순 배열 동작 체크", () => {
//     const mockedDates = [
//       { date: "2024-11-14T06:44:21.207Z" },
//       { date: "2024-11-13T06:44:21.207Z" },
//       { date: "2024-11-12T06:44:21.207Z" },
//       { date: "2024-11-11T06:44:21.207Z" },
//       { date: "2024-11-10T06:44:21.207Z" },
//     ];
//     const test = sortPosts(mockedDates);
//     expect(test).toEqual(answer);
//   });

//   test("오름차순 배열 동작 체크", () => {
//     const mockedDates = [
//       { date: "2024-11-10T06:44:21.207Z" },
//       { date: "2024-11-11T06:44:21.207Z" },
//       { date: "2024-11-12T06:44:21.207Z" },
//       { date: "2024-11-13T06:44:21.207Z" },
//       { date: "2024-11-14T06:44:21.207Z" },
//     ];
//     const test = sortPosts(mockedDates);
//     expect(test).toEqual(answer);
//   });
// });

// describe("getTags 체크", () => {
//   test("태그에 중복이 없는 경우 체크", () => {
//     const test = getTags([{ tag: "test" }, { tag: "test1" }, { tag: "test2" }]);
//     expect(test.length).toEqual(3);
//   });

//   test("태그에 중복이 있는 경우 체크", () => {
//     const test = getTags([{ tag: "test" }, { tag: "test1" }, { tag: "test" }]);
//     expect(test.length).toEqual(2);
//   });
// });

// describe("getData 체크", () => {
//   test("작동 확인", async () => {
//     const test = await getData();

//     expect(test.posts[0].title).toEqual("TEST11");
//     expect(test.tags[0]).toEqual("test1");
//   });
// });

describe("getDatas 체크", () => {
  test("작동 확인", async () => {
    const test = await getDatas();

    expect(test.posts[0].title).toEqual("TEST11");
    expect(test.tags[0]).toEqual("test1");
  });
});
