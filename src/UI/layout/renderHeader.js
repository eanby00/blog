import { getDomainURL } from "../../Util/getDataFromURL";
import { $ } from "../../Util/Helper";

const toggleDarkMode = () => {
  const darkButton = $(".dark");
  const lightButton = $(".light");
  const body = $("body");

  const isDarkModeOS = matchMedia("(prefers-color-scheme: dark)");
  let isDarkModeWeb = localStorage.getItem("dark") === "true";
  let isDarkMode =
    localStorage.getItem("dark") === null ? isDarkModeOS : isDarkModeWeb;

  const setMode = (trigger) => {
    localStorage.setItem("dark", trigger);
    isDarkModeWeb = trigger;

    if (trigger) {
      lightButton.classList.remove("close");
      darkButton.classList.add("close");
      body.classList.add("dark-mode");
    } else {
      lightButton.classList.add("close");
      darkButton.classList.remove("close");
      body.classList.remove("dark-mode");
    }
  };

  const setLightMode = () => {
    setMode(true);
  };

  const setDarkMode = () => {
    setMode(false);
  };

  const switchMode = () => {
    if (isDarkMode) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  switchMode();

  darkButton.addEventListener("click", setLightMode);
  lightButton.addEventListener("click", setDarkMode);
  isDarkModeOS.addEventListener("change", switchMode);
};

const renderSidebar = (sidebarSelector) => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const sidebar = $(sidebarSelector);
  const isDesktopView = matchMedia("(min-width: 40rem)");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display");
    sidebar.classList.toggle("open");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);

  isDesktopView.addEventListener("change", () => {
    if (isDesktopView.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("display");
      sidebar.classList.remove("open");
    }
  });
};

const setAnchor = () => {
  const anchor = $(".main-header h1 a");
  anchor.href = getDomainURL();
};

export const renderHeader = (sidebarSelector) => {
  toggleDarkMode();
  renderSidebar(sidebarSelector);
  setAnchor();
};
