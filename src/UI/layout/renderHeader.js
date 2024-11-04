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

  const setDarkMode = () => {
    lightButton.classList.remove("close");
    darkButton.classList.add("close");
    body.classList.add("dark-mode");
    localStorage.setItem("dark", true);
    isDarkModeWeb = true;
  };

  const setWhiteMode = () => {
    lightButton.classList.add("close");
    darkButton.classList.remove("close");
    body.classList.remove("dark-mode");
    localStorage.setItem("dark", false);
    isDarkModeWeb = false;
  };

  if (isDarkModeOS.matches || isDarkModeWeb) {
    setDarkMode();
  } else {
    setWhiteMode();
  }

  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    backdrop.classList.toggle("display");
    sidebar.classList.toggle("open");
  };

  mobileMenu.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);
  lightButton.addEventListener("click", setWhiteMode);
  darkButton.addEventListener("click", setDarkMode);
  isDesktopView.addEventListener("change", () => {
    if (isDesktopView.matches) {
      mobileMenu.classList.remove("open");
      backdrop.classList.remove("display");
      sidebar.classList.remove("open");
    }
  });
  isDarkModeOS.addEventListener("change", () => {
    if (isDarkModeOS.matches) {
      setWhiteMode();
    } else {
      setDarkMode();
    }
  });
};
