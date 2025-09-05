import { TITLES_GROUP_CHECKS_MAP } from '../config/constant.js';

const convertTextOfTypes = ({ textType }: { textType: string}): string => {
  return TITLES_GROUP_CHECKS_MAP[textType] || 'Grupo';
};

export default convertTextOfTypes;

