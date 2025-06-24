import { EKeyDataByStep } from "../../types/enums.js";
import { formState } from "../../config/constant.js";
import { TCategoryKey } from "../../types/types";

const isCategory = ({ category, key }: { category: TCategoryKey, key:EKeyDataByStep }):boolean =>{
   return formState.dataByStep[key]?.category === category;
}

export default isCategory;