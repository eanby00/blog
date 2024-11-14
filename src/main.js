import { render } from "./UI/render";
import { getDatas } from "./Util/getData";
import { setDomainURL } from "./Util/getDataFromURL";

const init = async () => {
  setDomainURL(location.href);

  const { posts, tags } = await getDatas();
  render(posts, tags);
};

init();
