import { Octokit } from "octokit";

const mobileTagIcon = document.querySelector(".mobile-menu");
const backdrop = document.querySelector(".backdrop");

const toggleMobileMenu = () => {
  const tagContainer = document.querySelector(".tag-container");

  tagContainer.classList.toggle("display-tag");
  backdrop.classList.toggle("display-block");
  mobileTagIcon.classList.toggle("open");
};

mobileTagIcon.addEventListener("click", toggleMobileMenu);
backdrop.addEventListener("click", toggleMobileMenu);

const posts = {};

const getPosts = async () => {
  const octokit = new Octokit({
    auth: API_KEY,
  });

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "eanby00",
      repo: "blog",
      path: "Posts",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const response_Posts_API = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "eanby00",
      repo: "blog",
      path: "Posts/API",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const response_Posts_API_GITHUB_API = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "eanby00",
      repo: "blog",
      path: "Posts/API/Github API",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const response_Posts_API_GITHUB_API_MD = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "eanby00",
      repo: "blog",
      path: "Posts/API/Github API/Github API.md",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log(response);
  console.log(response_Posts_API);
  console.log(response_Posts_API_GITHUB_API);
  console.log(response_Posts_API_GITHUB_API_MD);

  console.log("--------------------------------------");

  const response_tree = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: "eanby00",
      repo: "blog",
      tree_sha: "main",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const response_tree_sha = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: "eanby00",
      repo: "blog",
      tree_sha: "0fc657365d503491cf57f3283eb1353a06153e0a",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log(response_tree);
  console.log(response_tree_sha);

  // const tags = response.data;
  // tags.forEach((tag) => {
  //   posts[tag.name] = "1";
  // });

  // console.log(tags);
  // console.log(posts);
};

getPosts();
