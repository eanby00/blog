import { $ } from "../Util/Helper";

export const removeLoadingSpinner = () => {
  const loadingSpinner = $(".spinner");

  loadingSpinner.classList.add("close");
};
