# 페이히어 과제

페이히어 프론트엔드 엔지니어 과제
[배포 주소](https://pay-here-test.netlify.app/) 

## 요구 사항

 - [x] 검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
 - [x] 검색된 Public Repository를 등록할 수 있다.
    - [x] 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.
    - [x] 웹은 LocalStorage, 앱은 Async Storage 등 로컬 저장소를 활용한다. (웹 혹은 앱 선택)
 - [x] 등록된 Repository를 삭제할 수 있다.
 - [ ] 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
    - [x] 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
    - [x] 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
    - [ ] 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다.

## 기술 스택

- React
- Typescript
- Mui
- ReactQuery
- Recoil

## 실행

```
# 실행 방법
   npm install
   npm start
```

[github api limit](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)를 풀려면
`root` 폴더에 `.env` 파일을 생성하고 `REACT_APP_GH_TOKEN={github_token}`을 넣어주세요.

## 기타

netlify를 활용해서 간단하게 배포했습니다.

각 레포지토리에서 이슈를 가져와 페이지네이션하는 기능은 미완성입니다.
github search api로 가져올 수 있는 데이터에 limit이 걸려서 repository 검색시 모든 데이터를 가져오지 않습니다.