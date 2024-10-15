import { render } from "./UI/render";
import { getPostsAndTags } from "./Util/getPostsAndTags";

const init = async () => {
  const { posts, tags } = await getPostsAndTags();
  console.log(posts);
  console.log(tags);
  render(posts, tags);
};

init();
