export const hasData = () => {
  return false;
};

export const loadData = () => {
  return {
    posts: [
      {
        id: "1a214cee6217c5a01",
        title: "TEST11",
        tag: "test1",
        path: "TEST/test1/test11",
        date: "2024.10.29.",
        html_url: "TEST/test1/test11/TEST11.md html url",
        html: "<h1>test</h1>",
        description: "<h1>test</h1>",
      },
    ],
    tags: ["test1"],
  };
};

export const saveData = () => {
  return null;
};
