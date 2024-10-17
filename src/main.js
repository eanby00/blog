import { render } from "./UI/render";
import { getPostsAndTags } from "./Util/getPostsAndTags";

const init = async () => {
  const { posts, tags } = await getPostsAndTags();
  render(posts, tags);
};

init();
