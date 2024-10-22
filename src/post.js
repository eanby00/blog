console.log("Test");
const url = new URL(location.href);
const queryParams = url.searchParams;
const id = queryParams.get("id");
const test = queryParams.get("test");
console.log(url);
console.log(queryParams);
console.log(id, test);
