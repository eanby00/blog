import { getStorage } from "../store/store";

export const getDataFromURL = () => {
  const url = new URL(location.href);
  const queryParams = url.searchParams;
  const id = queryParams.get("id");

  return getStorage(id);
};
