# Github API

## Github Repository Content 가져오기

### 특정한 Content 가져오기

```javascript
// 실행 예시
octokit
  .request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: "eanby00",
    repo: "blog",
    path: "요구사항.md",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  .then((response) => {
    console.log(response);
  });
```

- `data`의 `content`로 데이터를 가져올 수 있다.

<br/>

### Repository 전체 데이터 tree로 가져오기

```javascript
// 실행 예시
octokit
  .request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner: "eanby00",
    repo: "blog",
    tree_sha: "main",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  .then((response) => {
    console.log(response);
  });
```

- `data`의 `tree`로 데이터 `tree`가 형성되어 있다.
- `tree`라면 폴더를 의미한다.
- 데이터의 `type`이 `blob`이라면 파일이며, `url`을 통해 접근해서 내부의 `content`를 디코딩해야 한다.
- 데이터의 `type`이 `tree`라면 폴더이며, `url`을 통해 접근해서 내부의 `tree`에 접근해야 한다.
