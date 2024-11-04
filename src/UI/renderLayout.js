import { GITHUB_API } from "../constants/API";
import { $ } from "../Util/Helper";
import { renderHeader } from "./renderHeader";

const renderGithubIcon = (url) => {
  const githubIcon = $("footer a");
  githubIcon.href = url ?? GITHUB_API.URL;
  githubIcon.classList.remove("close");
};

const observeHeader = (targetEl, entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      targetEl.classList.remove("display");
    } else {
      targetEl.classList.add("display");
    }
  });
};

const renderUpToTop = () => {
  const upToTopButton = $(".upToTop");
  upToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  const header = $(".main-header");
  const observer = new IntersectionObserver(
    observeHeader.bind(null, upToTopButton)
  );
  observer.observe(header);
};

export const renderLayout = (sidebarSelector, url) => {
  renderHeader(sidebarSelector);
  renderGithubIcon(url);
  renderUpToTop();
};
