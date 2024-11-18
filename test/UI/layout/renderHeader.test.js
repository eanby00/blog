/**
 * @jest-environment jsdom
 */

import { renderHeader } from "../../../src/UI/layout/renderHeader";
import { $ } from "../../../src/Util/Helper";

const mockResponse = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

matchMedia = jest.fn();
matchMedia.mockImplementation(() => {
  return {
    matches: false,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    change: jest.fn().mockImplementation(() => {
      $(".mobile-menu").classList.remove("open");
      $(".backdrop").classList.remove("display");
      $(".test").classList.remove("open");
    }),
    addEventListener: jest.fn(),
  };
});

document.body.innerHTML = `
    <div class="backdrop"></div>

    <header class="main-header">
      <h1><a href="/">Blog</a></h1>
      <div>
        <button class="dark close" title="change dark mode"></button>
        <button class="light close" title="change light mode"></button>
        <button class="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="test"></div>
    </header>`;

describe("renderHeader 체크 - white 모드의 경우", () => {
  location.href = "http://localhost:8080/";

  renderHeader(".test");

  const darkButton = $(".dark");
  const lightButton = $(".light");
  const body = $("body");

  test("기본 동작 확인", () => {
    expect(darkButton.classList.contains("close")).toBeFalsy();
    expect(lightButton.classList.contains("close")).toBeTruthy();
    expect(body.classList.contains("dark-mode")).toBeFalsy();
  });

  test("다크 버튼을 눌렀을 경우 동작 확인", () => {
    darkButton.click();

    expect(darkButton.classList.contains("close")).toBeTruthy();
    expect(lightButton.classList.contains("close")).toBeFalsy();
    expect(body.classList.contains("dark-mode")).toBeTruthy();
  });
});

describe("renderHeader 체크 - dark 모드의 경우", () => {
  matchMedia.matches = false;

  const darkButton = $(".dark");
  const lightButton = $(".light");
  const body = $("body");

  test("다크 모드일 경우 기본 동작 확인", () => {
    expect(darkButton.classList.contains("close")).toBeTruthy();
    expect(lightButton.classList.contains("close")).toBeFalsy();
    expect(body.classList.contains("dark-mode")).toBeTruthy();
  });

  test("white 버튼을 눌렀을 때 동작 확인", () => {
    lightButton.click();

    expect(darkButton.classList.contains("close")).toBeFalsy();
    expect(lightButton.classList.contains("close")).toBeTruthy();
    expect(body.classList.contains("dark-mode")).toBeFalsy();
  });
});

describe("renderSidebar 체크", () => {
  const mobileMenu = $(".mobile-menu");
  const backdrop = $(".backdrop");
  const sidebar = $(".test");

  test("기본 동작 확인", () => {
    expect(mobileMenu.classList.contains("open")).toBeFalsy();
    expect(backdrop.classList.contains("display")).toBeFalsy();
    expect(sidebar.classList.contains("open")).toBeFalsy();
  });

  test("모바일 버튼 동작 확인", () => {
    mobileMenu.click();

    expect(mobileMenu.classList.contains("open")).toBeTruthy();
    expect(backdrop.classList.contains("display")).toBeTruthy();
    expect(sidebar.classList.contains("open")).toBeTruthy();

    mobileMenu.click();
    expect(mobileMenu.classList.contains("open")).toBeFalsy();
    expect(backdrop.classList.contains("display")).toBeFalsy();
    expect(sidebar.classList.contains("open")).toBeFalsy();
  });

  test("사이드바가 열린 상태로 데스크톱 화면으로 전환될 때 동작 확인", () => {
    mobileMenu.click();
    expect(mobileMenu.classList.contains("open")).toBeTruthy();
    expect(backdrop.classList.contains("display")).toBeTruthy();
    expect(sidebar.classList.contains("open")).toBeTruthy();

    matchMedia().change();

    expect(mobileMenu.classList.contains("open")).toBeFalsy();
    expect(backdrop.classList.contains("display")).toBeFalsy();
    expect(sidebar.classList.contains("open")).toBeFalsy();
  });
});

describe("setAnchor 체크", () => {
  test("기본 동작 확인", () => {
    const anchor = $(".main-header h1 a");
    expect(anchor.href).toEqual("http://localhost:8080/");
  });
});
