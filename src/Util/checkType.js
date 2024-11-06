import { FILE_FORMAT } from "../constants/File_FORMAT";

export const isFolder = (data) => {
  return Array.isArray(data);
};

export const isMDFile = ({ name }) => {
  return name.slice(-2).toLowerCase() === "md";
};

export const isImgFile = ({ name }) => {
  return name.slice(-2).toLowerCase() in FILE_FORMAT.IMAGE;
};
