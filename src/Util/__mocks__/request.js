export const getCommit = (path) => {
  return new Promise((resolve) => {
    const response = {
      data: [
        {
          commit: {
            author: {
              name: "test name",
              email: "test email",
              date: "2024-10-29T02:48:18Z",
            },
          },
        },
      ],
    };

    resolve(response);
  });
};
