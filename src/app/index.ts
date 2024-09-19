import { Category } from "../types";

export const getCategoryPath = (categories:Category[], categoryName: string):string => {
  let resultName = "";
  for (const category of categories) {
    if (category.name === categoryName) {
      resultName = `/${category.name}`;
    }
    if (category.subcategories.length > 0) {
      const catName = getCategoryPath(category.subcategories, categoryName);
      if (catName !== "") {
        resultName = `/${category.name}${catName}`;
      }
    }
  }
  return resultName;
};