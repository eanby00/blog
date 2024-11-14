import { getStorage } from "../store/store";

export const makeDomainUrl = (href) => {
  if (href.includes("?"))
    return href.slice(0, href.lastIndexOf("?")).replace("/post", "");
  return href;
};

export const getDataFromURL = () => {
  const url = new URL(location.href);
  const queryParams = url.searchParams;
  const id = queryParams.get("id");
  if (!id) {
    throw new Error("잘못된 접근입니다.");
  }

  const result = getStorage(id);
  if (result) return result;

  location.href = makeDomainUrl(location.href);
  throw new Error("잘못된 접근입니다.");
};
