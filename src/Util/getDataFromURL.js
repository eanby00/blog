import { getStorage, setStorage } from "../store/store";

export const setDomainURL = (href) => {
  if (getStorage("domain")) return;
  setStorage("domain", href);
};

export const getDomainURL = () => {
  if (!getStorage("domain"))
    throw new Error("Domain이 제대로 설정되어 있지 않습니다.");
  return getStorage("domain");
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

  location.href = getDomainURL();
  throw new Error("잘못된 접근입니다.");
};
