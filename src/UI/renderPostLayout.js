import { $ } from "../Util/Helper";

const renderHeader = () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const aside = $("aside");
  const media = matchMedia("(min-width: 40rem)");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display");
    aside.classList.toggle("open");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
  media.addEventListener("change", () => {
    if (media.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("display");
      aside.classList.remove("open");
    }
  });
};

const renderGithubIcon = (href) => {
  const githubIcon = $("footer a");
  githubIcon.href = href;
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

export const renderPostLayout = (post) => {
  renderHeader();
  renderGithubIcon(post.html_url);
  renderUpToTop();
};
