import { EKeyDataByStep } from "../../types/enums.js";
// import { formState } from "../../config/constant.js";
import { TCategoryKey } from "../../types/types";

// const isCategory = ({ category, key }: { category: TCategoryKey, key:EKeyDataByStep }):boolean =>{
//    return formState.dataByStep[key]?.category === category;
// }

// export default isCategory;

const isCategory = ({ category, key }: { category: TCategoryKey, key: EKeyDataByStep }): boolean => {
   const storedData = localStorage.getItem("dataStep");
   if (!storedData) return false;

   try {
      const dataStep = JSON.parse(storedData) as Record<EKeyDataByStep, { category?: TCategoryKey }>;
      return dataStep[key]?.category === category;
   } catch (error) {
      console.error("Error al parsear dataStep desde localStorage:", error);
      return false;
   }
};

export default isCategory;