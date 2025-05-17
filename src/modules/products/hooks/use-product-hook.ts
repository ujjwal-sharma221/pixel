import { useQueryStates } from "nuqs";

import { params } from "../product-search-params";

export const useProductFilters = () => {
  return useQueryStates(params);
};
