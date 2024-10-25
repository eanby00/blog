# Github API

> Github Rest API를 통한 콘텐츠와 커밋 가져오기

## 목차

- [Octokit 설정](#octokit-설정)
  - [테스트1](#)
  - [테스트2](#)
  - [테스트3](#)
- [get Repository Content](#get-repository-content)
- [get Commit Data](#get-commit-data)

<br/>

## Octokit 설정

```javascript
const octokit = new Octokit({
  auth: "API 키",
});
```

- `Github REST API` 사용을 위한 기본 설정

<br/>

## get Repository Content

```javascript
octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
  owner: "OWNER",
  repo: "REPO",
  path: "PATH",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
```

- 특정 파일을 가져오는 코드
- `owner`: `repository` 소유자
- `repo`: `repository` 이름
- `path`: 가져올 파일의 `reppository`상의 위치

<br/>

![img1](./get%20content%20folder.png)

- 폴더의 경우 `data` 속성이 배열이다
- 폴더의 경우 배열 속 객체에 `content` 값이 존재하지 않는다.

<br/>

![img2](./get%20content%20file.png)

- 파일의 경우 `data` 속성이 객체다.
- 파일의 경우 `content`로 데이터가 저장되어 있다.

<br/>

## get Commit Data

```javascript
octokit.request("GET /repos/{owner}/{repo}/commits", {
  owner: "OWNER",
  repo: "REPO",
  path: "PATH",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
```

- 커밋 리스트를 가져오는 코드
- `path`는 선택사항, `path`를 조건으로 선택할 수 있다.
