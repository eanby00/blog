import { render } from "./UI/render";
import { getDatas } from "./Util/getData";

const init = async () => {
  const { posts, tags } = await getDatas();
  render(posts, tags);
};

init();
