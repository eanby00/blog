export class Octokit {
  constructor(option) {
    this.auth = option.auth ?? "";
  }

  request(method) {
    if (method === "MD_FILE") {
      return {
        data: {
          name: "test.md",
          path: "Posts/test tag/test/test.md",
          sha: "test sha",
          size: 1289,
          url: "test url",
          html_url: "test html url",
          git_url: "test git url",
          download_url: "test download url",
          type: "file",
          content: "test content base64 encoding",
          _links: {
            self: "test self url",
            git: "test git url",
            html: "test html url",
          },
        },
      };
    } else if (method === "FOLDER") {
      return {
        data: [
          {
            name: "test.md",
            path: "Posts/test tag/test/test.md",
            sha: "test sha",
            size: 1289,
            url: "test url",
            html_url: "test html url",
            git_url: "test git url",
            download_url: null,
            type: "file",
            content: "test content base64 encoding",
            _links: {
              self: "test self url",
              git: "test git url",
              html: "test html url",
            },
          },
        ],
      };
    } else if (method === "IMAGE_FILE") {
      return {
        data: {
          name: "test.png",
          path: "Posts/test tag/test/test.png",
          sha: "test sha",
          size: 1289,
          url: "test url",
          html_url: "test html url",
          git_url: "test git url",
          download_url: null,
          type: "file",
          content: "test content base64 encoding",
          _links: {
            self: "test self url",
            git: "test git url",
            html: "test html url",
          },
        },
      };
    } else if (method === "COMMIT") {
      return {
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
    } else {
      return "";
    }
  }
}
