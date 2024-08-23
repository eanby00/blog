# Github API

> Github Rest API 중 특정 위치의 데이터를 가져오는 API, 2개의 API가 가져오는 데이터는 거의 유사하나 Path를 통해서 가져오는지 branch를 통해서 가져오는지의 차이가 있다.

## get Repository Content

```javascript
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

![img1](./get%20content%20folder.png)

- 폴더의 경우 `data` 속성이 배열이다
- 폴더의 경우 배열 속 객체에 `content` 값이 존재하지 않는다.

<br/>

![img2](./get%20content%20file.png)

- 파일의 경우 `data` 속성이 객체다.
- 파일의 경우 `content`로 데이터가 저장되어 있다.

<br/>

## get Repository Tree

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

![img](./get%20tree.png)

- 데이터의 `type`이 `blob`이라면 파일이며, `url`을 통해 접근해서 내부의 `content`를 디코딩해야 한다.
- 데이터의 `type`이 `tree`라면 폴더이며, `url`을 통해 접근해서 내부의 `tree`에 접근해야 한다.
