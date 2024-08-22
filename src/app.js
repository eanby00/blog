import { Octokit } from "octokit";
import { GITHUB_API } from "./constants/API";

const octokit = new Octokit({
  auth: API_KEY,
});

const mobileTagIcon = document.querySelector(".mobile-menu");
const backdrop = document.querySelector(".backdrop");

const isMDFile = (data) => {
  return (
    typeof data === "object" &&
    data.name.slice(name.length - 2).toLowerCase() === "md"
  );
};

const isFolder = (data) => {
  return Array.isArray(data);
};

const getTag = (path) => {
  return path.split("/")[GITHUB_API.TAG_DEPTH];
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
    owner: GITHUB_API.OWNER,
    repo: GITHUB_API.REPO,
    path: path,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

const getPost = async (path) => {
  const response = await getContent(octokit, path);

  if (isFolder(response.data)) {
    response.data.forEach((data) => {
      getPost(data.path);
    });
  } else if (isMDFile(response.data)) {
    posts.push({
      ...response.data,
      title: response.data.name.slice(0, response.data.name.length - 2),
      tag: getTag(response.data.path),
      "last-modified": response.headers["last-modified"],
    });
  }
};

const getPosts = async () => {
  await getPost(GITHUB_API.PATH_POSTS);

  console.log(posts);
};

getPosts();
