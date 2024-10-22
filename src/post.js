import { getStorage } from "./store/store";

const url = new URL(location.href);
const queryParams = url.searchParams;
const title = queryParams.get("title");

const post = JSON.parse(getStorage(title));
console.log(post);
