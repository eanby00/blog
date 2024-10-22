console.log("Test");
const url = new URL(location.href);
const queryParams = url.searchParams;
const title = queryParams.get("title");
const tag = queryParams.get("tag");
console.log(url);
console.log(queryParams);
console.log(title, tag);

const posts = JSON.parse(sessionStorage.getItem("posts"));
console.log(posts);
const post = posts.filter((post) => post.title === title);
console.log(post);
