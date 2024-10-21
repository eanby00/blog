import { render } from "./UI/render";
import { getData } from "./Util/getData";

const init = async () => {
  const { posts, tags } = await getData();
  render(posts, tags);
};

init();
