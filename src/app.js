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

const octokit = new Octokit({
  auth: API_KEY,
});

octokit
  .request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: "eanby00",
    repo: "blog",
    path: "public",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  .then((response) => {
    console.log(response);
  });

// octokit
//   .request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
//     owner: "eanby00",
//     repo: "blog",
//     tree_sha: "main",
//     headers: {
//       "X-GitHub-Api-Version": "2022-11-28",
//     },
//   })
//   .then((response) => {
//     console.log(response);
//   });
