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

export const getContent = (path) => {
  if (path === "TEST") {
    return new Promise((resolve) => {
      const response = {
        data: [
          {
            name: "test1",
            path: "TEST/test1",
            url: "TEST/test1 url",
            html_url: "TEST/test1 html url",
            git_url: "TEST/test1 git url",
            download_url: null,
            type: "dir",
            _links: {
              self: "TEST/test1 self url",
              git: "TEST/test1 git url",
              html: "TEST/test1 html url",
            },
          },
        ],
      };

      resolve(response);
    });
  } else if (path === "TEST/test1") {
    return new Promise((resolve) => {
      const response = {
        data: [
          {
            name: "test11",
            path: "TEST/test1/test11",
            url: "TEST/test1/test11 url",
            html_url: "TEST/test1/test11 html url",
            git_url: "TEST/test1/test11 git url",
            download_url: null,
            type: "dir",
            _links: {
              self: "TEST/test1/test11 self url",
              git: "TEST/test1/test11 git url",
              html: "TEST/test1/test11 html url",
            },
          },
        ],
      };

      resolve(response);
    });
  } else if (path === "TEST/test1/test11") {
    return new Promise((resolve) => {
      const response = {
        data: [
          {
            name: "TEST11.md",
            path: "TEST/test1/test11/TEST11.md",
            size: 1280,
            url: "TEST/test1/test11/TEST11.md url",
            html_url: "TEST/test1/test11/TEST11.md html url",
            git_url: "TEST/test1/test11/TEST11.md git url",
            download_url: "TEST/test1/test11/TEST11.md download url",
            type: "file",
            _links: {
              self: "TEST/test1/test11/TEST11.md self url",
              git: "TEST/test1/test11/TEST11.md git url",
              html: "TEST/test1/test11/TEST11.md html url",
            },
          },
          {
            name: "TEST12.png",
            path: "TEST/test1/test11/TEST12.png",
            size: 1280,
            url: "TEST/test1/test11/TEST12.png url",
            html_url: "TEST/test1/test11/TEST12.png html url",
            git_url: "TEST/test1/test11/TEST12.png git url",
            download_url: "TEST/test1/test11/TEST12.png download url",
            type: "file",
            _links: {
              self: "TEST/test1/test11/TEST12.png self url",
              git: "TEST/test1/test11/TEST12.png git url",
              html: "TEST/test1/test11/TEST12.png html url",
            },
          },
        ],
      };

      resolve(response);
    });
  } else if (path === "TEST/test1/test11/TEST11.md") {
    return new Promise((resolve) => {
      const response = {
        data: {
          name: "TEST11.md",
          path: "TEST/test1/test11/TEST11.md",
          size: 1280,
          url: "TEST/test1/test11/TEST11.md url",
          html_url: "TEST/test1/test11/TEST11.md html url",
          git_url: "TEST/test1/test11/TEST11.md git url",
          download_url: "TEST/test1/test11/TEST11.md download url",
          type: "file",
          content: "PGgxPnRlc3Q8L2gxPg==",
          encoding: "base64",
          _links: {
            self: "TEST/test1/test11/TEST11.md self url",
            git: "TEST/test1/test11/TEST11.md git url",
            html: "TEST/test1/test11/TEST11.md html url",
          },
        },
      };

      resolve(response);
    });
  } else if (path === "TEST/test1/test11/TEST12.png") {
    return new Promise((resolve) => {
      const response = {
        data: {
          name: "TEST12.png",
          path: "TEST/test1/test11/TEST12.png",
          size: 1280,
          url: "TEST/test1/test11/TEST12.png url",
          html_url: "TEST/test1/test11/TEST12.png html url",
          git_url: "TEST/test1/test11/TEST12.png git url",
          download_url: "TEST/test1/test11/TEST12.png download url",
          type: "file",
          content: "PGgxPnRlc3Q8L2gxPg==",
          encoding: "base64",
          _links: {
            self: "TEST/test1/test11/TEST12.png self url",
            git: "TEST/test1/test11/TEST12.png git url",
            html: "TEST/test1/test11/TEST12.png html url",
          },
        },
      };

      resolve(response);
    });
  }
};
