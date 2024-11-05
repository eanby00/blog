export const isMDFile = (data) => {
  return (
    typeof data === "object" &&
    data.name.slice(data.name.length - 2).toLowerCase() === "md"
  );
};

export const isFolder = (data) => {
  return Array.isArray(data);
};
