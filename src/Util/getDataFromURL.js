import { getStorage, setStorage } from "../store/store";

export const getDomainURL = () => {
  if (!getStorage("domain")) {
    setStorage("domain", location.href);
    return location.href;
  }

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
