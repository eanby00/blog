import { FILE_FORMAT } from "../constants/File_FORMAT";

export const isFolder = (data) => {
  return Array.isArray(data);
};

export const isMDFile = (data) => {
  return data?.name?.split(".").pop().toLowerCase() === "md";
};

export const isImgFile = (data) => {
  return FILE_FORMAT.IMAGE.includes(data?.name?.split(".").pop().toLowerCase());
};
