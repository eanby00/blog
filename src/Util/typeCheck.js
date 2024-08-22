export const isMDFile = (data) => {
  return (
    typeof data === "object" &&
    data.name.slice(name.length - 2).toLowerCase() === "md"
  );
};

export const isFolder = (data) => {
  return Array.isArray(data);
};
