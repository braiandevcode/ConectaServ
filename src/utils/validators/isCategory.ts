import { EKeyDataByStep } from "../../types/enums.js";
import { TCategoryKey } from "../../types/types";

const isCategory = ({ category, key }: { category: TCategoryKey; key: EKeyDataByStep }): boolean => {
  const data = JSON.parse(localStorage.getItem("stepData") || "{}");  
  return data[key]?.category === category;
};

export default isCategory;