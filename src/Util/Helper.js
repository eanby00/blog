export const $ = (identifier, targetTag) => {
  return targetTag
    ? targetTag.querySelector(identifier)
    : document.querySelector(identifier);
};

export const $All = (identifier, targetTag) => {
  return targetTag
    ? targetTag.querySelectorAll(identifier)
    : document.querySelectorAll(identifier);
};

export const createElement = (selector, targetTag) => {
  if (targetTag) {
    return document
      .importNode($(selector).content, true)
      .querySelector(targetTag);
  }
  return document.importNode($(selector).content, true);
};

export const hasClass = (targetTag, className) => {
  try {
    return targetTag.classList.contains(className);
  } catch (error) {
    throw new Error(`targetTag가 존재하지 않습니다.\n${error.message}`);
  }
};

export const generateID = (title) => {
  const titleCode = title
    .split("")
    .map((char) => char.charCodeAt())
    .reduce((prev, curr) => prev + curr, 0)
    .toString(16);
  const randomDate = (Date.now() * Math.random()).toString(16).replace(".", "");
  return titleCode + randomDate;
};

export const sortArray = (array) => {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const deduplication = (array) => {
  return Array.from(new Set(array));
};

export const formatDate = (day) => {
  const year = day.getFullYear();
  const month = day.getMonth() + 1;
  const date = day.getDate();
  return `${year}.${month < 10 ? "0" + month.toString() : month}.${date}.`;
};
