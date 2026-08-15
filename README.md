# 2026S_Sapiens
신인류AI사피엔스경험디자인 최재붕 교수님

## PackCheck

여행 조건을 고르면 준비물 체크리스트를 만들어 주는 한 페이지 웹앱.

배포 주소: (여기에 배포 주소를 적으세요)

## 팀원용 3단계

1. 코드 받기: `git clone https://github.com/Choi-Jung-Hyeon/2026S_Sapiens.git`
2. 수정하기: `index.html`을 브라우저로 열어서 확인하고, AI에게 수정 요청
3. 올리기: `git add . && git commit -m "2차 개선" && git push`

## 파일 3개

| 파일 | 무엇 |
|---|---|
| `index.html` | 화면과 동작. 여는 파일. |
| `rules.js` | 준비물 규칙 테이블. 준비물을 바꾸려면 여기만 고치면 됩니다. |
| `style.css` | 색과 모양. 색을 바꾸려면 맨 위 `:root` 부분만 고치면 됩니다. |

세 파일은 반드시 같은 폴더에 두세요. 빌드나 설치는 필요 없고, `index.html`을 더블클릭하면 그대로 열립니다.

## Google Analytics

`index.html` 위쪽 `<!-- ===== Google Analytics (GA4) 시작 ===== -->` 주석 아래의
`G-XXXXXXXXXX` 두 군데를 실제 측정 ID로 바꾸면 측정이 시작됩니다.

기록되는 이벤트: `list_generated`, `suggestion_added`, `suggestion_rejected`,
`essential_removed`, `item_checked`, `list_shared`, `shared_link_opened`
