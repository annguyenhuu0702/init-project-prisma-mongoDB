import { compact } from "lodash";
import ShortUniqueId from "short-unique-id";

const generateCode = (length) => {
  const { randomUUID } = new ShortUniqueId({ length });

  return randomUUID();
};

const toEnglish = (str: string) => {
  str = str.toLowerCase();

  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/[đĐ]/g, "d");

  str = str.replace(/([^0-9a-z-\s])/g, "");

  str = str.replace(/^-+|-+$/g, "");

  return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSearchString = (value: any[]) => {
  return compact(value)
    .map((v) => toEnglish(v))
    .join(",");
};

export { createSearchString, generateCode };
