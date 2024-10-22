import { getStorage } from "./store/store";

const url = new URL(location.href);
const queryParams = url.searchParams;
const id = queryParams.get("id");

const post = JSON.parse(getStorage(id));
console.log(post);
