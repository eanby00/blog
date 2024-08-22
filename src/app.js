import { Octokit } from "octokit";

const OWNER = "eanby00";
const REPO = "blog";
const PATH_POSTS = "Posts";
const TAG_DEPTH = 1;

const octokit = new Octokit({
  auth: API_KEY,
});

const mobileTagIcon = document.querySelector(".mobile-menu");
const backdrop = document.querySelector(".backdrop");

const isMDFile = (name) => {
  return name.slice(name.length - 2).toLowerCase() === "md";
};

const getTag = (path = "Posts/API/Github API/Github API.md") => {
  return path.split("/")[TAG_DEPTH];
};

const toggleMobileMenu = () => {
  const tagContainer = document.querySelector(".tag-container");

  tagContainer.classList.toggle("display-tag");
  backdrop.classList.toggle("display-block");
  mobileTagIcon.classList.toggle("open");
};

mobileTagIcon.addEventListener("click", toggleMobileMenu);
backdrop.addEventListener("click", toggleMobileMenu);

const posts = [];

const getContent = async (octokit, path) => {
  return await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: OWNER,
    repo: REPO,
    path: path,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

const getPost = async (path) => {
  const response = await getContent(octokit, path);

  if (Array.isArray(response.data)) {
    response.data.forEach((data) => {
      getPost(data.path);
    });
  } else if (
    typeof response.data === "object" &&
    isMDFile(response.data.name)
  ) {
    console.log(response);
    posts.push({
      ...response.data,
      title: response.data.name.slice(0, response.data.name.length - 2),
      tag: getTag(response.data.path),
      "last-modified": response.headers["last-modified"],
    });
  }
};

const getPosts = async () => {
  await getPost(PATH_POSTS);

  console.log(posts);
};

getPosts();
