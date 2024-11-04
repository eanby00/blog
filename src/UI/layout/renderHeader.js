import { $ } from "../../Util/Helper";

export const renderHeader = (sidebarSelector) => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const sidebar = $(sidebarSelector);
  const lightButton = $(".light");
  const darkButton = $(".dark");
  const body = $("body");
  const isDesktopView = matchMedia("(min-width: 40rem)");
  const isDarkModeOS = matchMedia("(prefers-color-scheme: dark)");
  let isDarkModeWeb = localStorage.getItem("dark") === "true";

  if (isDarkModeOS.matches || isDarkModeWeb) {
    lightButton.classList.toggle("close");
    body.classList.toggle("dark-mode");
    localStorage.setItem("dark", true);
    isDarkModeWeb = true;
  } else {
    darkButton.classList.toggle("close");
    localStorage.setItem("dark", false);
    isDarkModeWeb = false;
  }

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display");
    sidebar.classList.toggle("open");
  };

  const toggleDarkMode = () => {
    lightButton.classList.toggle("close");
    darkButton.classList.toggle("close");
    body.classList.toggle("dark-mode");
    localStorage.setItem("dark", !isDarkModeWeb);
    isDarkModeWeb = !isDarkModeWeb;
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
  lightButton.addEventListener("click", toggleDarkMode);
  darkButton.addEventListener("click", toggleDarkMode);
  isDesktopView.addEventListener("change", () => {
    if (isDesktopView.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("display");
      sidebar.classList.remove("open");
    }
  });
  isDarkModeOS.addEventListener("change", () => {
    if (isDarkModeOS.matches) {
      lightButton.classList.add("close");
      darkButton.classList.remove("close");
      body.classList.add("dark-mode");
      localStorage.setItem("dark", true);
      isDarkModeWeb = true;
    } else {
      lightButton.classList.remove("close");
      darkButton.classList.add("close");
      body.classList.remove("dark-mode");
      localStorage.setItem("dark", false);
      isDarkModeWeb = false;
    }
  });
};
