# 2026S_Sapiens
신인류AI사피엔스경험디자인 최재붕 교수님

## PackCheck

여행 조건을 고르면 준비물 체크리스트를 만들어 주는 한 페이지 웹앱.

배포 주소: https://choi-jung-hyeon.github.io/2026S_Sapiens/

`main` 브랜치에 푸시하면 1~2분 뒤 위 주소에 자동 반영됩니다 (GitHub Pages).

## 팀원용 3단계

1. 코드 받기: `git clone https://github.com/Choi-Jung-Hyeon/2026S_Sapiens.git`
2. 수정하기: `index.html`을 브라우저로 열어서 확인하고, AI에게 수정 요청
3. 올리기: `git add . && git commit -m "2차 개선" && git push`

## 어느 파일을 열어야 하나

| 파일 | 언제 여는가 | 무엇이 들어 있나 |
|---|---|---|
| `rules.js` | **준비물을 바꿀 때 (대부분 여기)** | 준비물 39개 규칙표, 국가 목록, 콘센트 타입 |
| `index.html` | 문구를 바꿀 때 | 화면 뼈대와 버튼 이름 |
| `styles.css` | 색을 바꿀 때 | 맨 위 `:root` 의 색상값만 고치면 전체 반영 |
| `app.js` | 기능을 바꿀 때 | 화면 동작, 공유, 이벤트 기록 |

네 파일은 반드시 같은 폴더에 두세요. 빌드나 설치는 필요 없고, `index.html`을 더블클릭하면 그대로 열립니다.
(`npm`, 번들러, `type="module"`, `fetch` 전부 쓰지 않았습니다. 쓰는 순간 더블클릭이 막힙니다.)

### 준비물 하나 추가하는 법

`rules.js` 의 `// ===== 규칙 테이블 시작 =====` 아래에 한 줄을 넣으면 됩니다.

```js
{ id: 'slippers', name: '실내용 슬리퍼', category: '기타', type: 'suggest', qty: null,
  reason: '숙소에서 신을 신발이 필요합니다',
  when: function (t) { return t.nights >= 2; } },
```

`type` 이 `'auto'` 면 리스트에 바로 들어가고, `'suggest'` 면 추천 카드로 나옵니다.
`when` 에 쓸 수 있는 조건은 같은 파일의 주석에 정리돼 있습니다.

## 측정 방법

Google Analytics는 쓰지 않습니다. 데이터 반영에 하루가 걸려 수업 일정에 맞지 않아,
**팀 내부 + 지인 관찰 테스트**로 KPI를 측정합니다.

- 테스터가 다 쓰고 나서 결과 화면 맨 아래 **"테스트 기록 복사"** 를 누르면 아래 형식의 텍스트가 복사됩니다.
  이걸 단톡방에 붙여넣어 주면 집계가 끝납니다.

```
[PackCheck 테스트기록]
조건: 해외 / 영국 / 8월 / 4~6박 / 관광 / 2명
자동 생성 항목: 17개
추가한 추천 항목(2): 선크림, 선글라스
거절한 추천 항목(1): 목베개
삭제한 필수 항목: 없음
직접 추가한 항목(1): 렌즈 세척액
되돌리기 사용: 1회
알림 버튼: 눌렀음
체크 완료: 15 / 18
```

공유 링크로 들어온 테스터는 첫 줄이 `[PackCheck 테스트기록 / 공유링크 진입]` 으로 나옵니다.
`실행 취소`로 되돌린 항목은 기록에서 빠지므로, 집계에는 최종 결과만 남습니다.

- 개발 중 동작 확인은 브라우저 개발자도구(F12) → Console 탭에서 `[track]` 로그로 볼 수 있습니다.
  기록되는 이벤트: `list_generated`, `suggestion_added`, `suggestion_rejected`,
  `essential_removed`, `item_checked`, `list_shared`, `shared_link_opened`,
  `custom_item_added`, `undo_used`, `notify_cta_click`
- 나중에 측정 도구를 붙이려면 `app.js` 의 `track()` 함수 안만 바꾸면 됩니다.
  이벤트 발생 지점은 코드 곳곳에 그대로 남겨 두었습니다.
- **"출발 1시간 전 알림 받기"** 는 수요만 확인하는 버튼입니다. 실제 알림 기능은 없고,
  누르면 안내 문구만 뜹니다. 전화번호를 받거나 서버로 보내는 동작은 전혀 없습니다.
