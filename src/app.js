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
};

getPosts();
