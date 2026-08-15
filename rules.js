/* PackCheck 준비물 규칙 테이블
   이 파일만 고치면 준비물 목록이 바뀝니다. index.html 은 건드릴 필요가 없습니다.
   주의: 이 파일은 일반 <script src="rules.js"></script> 로 읽힙니다.
        import / export 를 쓰거나 fetch 로 불러오면 file:// 에서 열리지 않습니다. */

var CATEGORY_ORDER = ['서류·금융', '전자기기', '의류', '세면·화장', '의약품', '기타'];

/* ============================================================
   국가 목록과 콘센트 타입
   국가를 추가하려면 아래에 한 줄만 넣으면 됩니다.
   화면의 국가 선택 버튼도 이 목록에서 자동으로 만들어집니다.
     code    : 공유 링크에 들어가는 짧은 코드. 겹치면 안 됩니다.
     label   : 화면에 보이는 이름
     adapter : 콘센트 타입. 빈 문자열이면 타입을 표시하지 않습니다.
   영국은 유럽 본토(C형)와 콘센트 규격이 달라서(G형) 따로 둡니다.
   ============================================================ */
var COUNTRIES = [
  { code: 'jp',  label: '일본',       adapter: 'A형' },
  { code: 'cn',  label: '중국',       adapter: 'A/I형' },
  { code: 'sea', label: '동남아',     adapter: 'A/C형' },
  { code: 'eu',  label: '유럽',       adapter: 'C형' },
  { code: 'uk',  label: '영국',       adapter: 'G형' },
  { code: 'us',  label: '미주',       adapter: 'A형' },
  { code: 'oc',  label: '오세아니아', adapter: 'I형' },
  { code: 'etc', label: '기타',       adapter: '' }
];

// 국가 코드로 콘센트 타입을 찾습니다.
function adapterType(code) {
  for (var i = 0; i < COUNTRIES.length; i++) {
    if (COUNTRIES[i].code === code) { return COUNTRIES[i].adapter; }
  }
  return '';
}

/* ============================================================
   수량 계산식
   RULES 의 qty 에 아래 문자열을 쓰면 박수(nights)로 계산됩니다.
   새 계산식이 필요하면 여기에 한 줄 추가하세요.
   ============================================================ */
var QTY_FORMULA = {
  'min(nights+1,5)': function (n) { return Math.min(n + 1, 5); }, // 박수+1 (최대 5)
  'max(nights,1)':   function (n) { return Math.max(n, 1); },     // 박수 (최소 1)
  'ceil(nights/2)':  function (n) { return Math.ceil(n / 2); }    // 박수의 절반, 올림
};

// ===== 규칙 테이블 시작 (이 블록만 교체하면 준비물이 바뀝니다) =====
// 항목 스키마: { id, name, category, type, qty, reason, when }
//  - id       : 영문 소문자 고유값. 중복되면 안 됩니다.
//  - name     : 화면에 보이는 한글 항목명. 함수로 쓰면 여행 조건(t)에 따라 이름을 바꿀 수 있습니다.
//  - category : '서류·금융' / '전자기기' / '의류' / '세면·화장' / '의약품' / '기타'
//  - type     : 'auto'(바로 리스트에 추가) 또는 'suggest'(추천 카드로 노출)
//  - qty      : 숫자, 계산식 문자열(위 QTY_FORMULA 참고), 또는 null(수량 표시 없음)
//  - reason   : 추천 카드에 보이는 한 줄 이유. 'auto' 항목은 null.
//               함수로 쓰면 여행 조건(t)에 따라 문구를 바꿀 수 있습니다. (접이식 우산 참고)
//  - when     : 조건 함수(true 면 포함) 또는 null(항상 포함)
//    조건 함수에 넘어오는 t 의 형태:
//      t.destination : 'domestic' | 'overseas'
//      t.country     : 위 COUNTRIES 의 code ('jp','cn','sea','eu','uk','us','oc','etc') 또는 null
//      t.month       : 1 ~ 12
//      t.nights      : 0 | 1 | 2 | 4 | 7  (박수)
//      t.purpose     : 'tour' | 'relax' | 'active' | 'biz'
//      t.headcount   : 1 | 2 | 3
var RULES = [
  /* --- 항상 자동 추가 --- */
  { id: 'id_card',    name: '신분증',                 category: '서류·금융', type: 'auto', qty: null,              reason: null, when: function (t) { return t.destination === 'domestic'; } },
  { id: 'passport',   name: '여권',                   category: '서류·금융', type: 'auto', qty: null,              reason: null, when: function (t) { return t.destination === 'overseas'; } },
  { id: 'wallet',     name: '지갑 (카드·현금)',        category: '서류·금융', type: 'auto', qty: null,              reason: null, when: null },
  { id: 'charger',    name: '휴대폰 충전기',           category: '전자기기',  type: 'auto', qty: null,              reason: null, when: null },
  { id: 'powerbank',  name: '보조배터리',              category: '전자기기',  type: 'auto', qty: null,              reason: null, when: null },
  { id: 'earphone',   name: '이어폰',                 category: '전자기기',  type: 'auto', qty: null,              reason: null, when: null },
  { id: 'toothbrush', name: '칫솔·치약',              category: '세면·화장', type: 'auto', qty: null,              reason: null, when: null },
  { id: 'underwear',  name: '속옷',                   category: '의류',     type: 'auto', qty: 'min(nights+1,5)', reason: null, when: null },
  { id: 'socks',      name: '양말',                   category: '의류',     type: 'auto', qty: 'min(nights+1,5)', reason: null, when: null },
  { id: 'top',        name: '상의',                   category: '의류',     type: 'auto', qty: 'max(nights,1)',   reason: null, when: null },
  { id: 'bottom',     name: '하의',                   category: '의류',     type: 'auto', qty: 'ceil(nights/2)',  reason: null, when: null },
  { id: 'medicine',   name: '상비약 (진통제·소화제·밴드)', category: '의약품', type: 'auto', qty: null,            reason: null, when: null },

  /* --- 해외일 때 자동 추가 --- */
  { id: 'passport_copy', name: '여권 사본',            category: '서류·금융', type: 'auto', qty: null, reason: null, when: function (t) { return t.destination === 'overseas'; } },
  { id: 'adapter',
    name: function (t) {
      var type = adapterType(t.country);
      return type ? '콘센트 어댑터 (' + type + ')' : '콘센트 어댑터';
    },
    category: '전자기기', type: 'auto', qty: null, reason: null, when: function (t) { return t.destination === 'overseas'; } },
  { id: 'insurance',  name: '해외여행자보험 증서',      category: '서류·금융', type: 'auto', qty: null, reason: null, when: function (t) { return t.destination === 'overseas'; } },
  { id: 'currency',   name: '현지 화폐 (환전)',        category: '서류·금융', type: 'auto', qty: null, reason: null, when: function (t) { return t.destination === 'overseas'; } },
  { id: 'sim',        name: '유심 또는 eSIM',          category: '전자기기',  type: 'auto', qty: null, reason: null, when: function (t) { return t.destination === 'overseas'; } },

  /* --- 조건부 추천 항목 --- */
  { id: 'sunscreen',  name: '선크림',      category: '세면·화장', type: 'suggest', qty: null, reason: '자외선이 강한 시기입니다',
    when: function (t) { return (t.month >= 5 && t.month <= 9) || t.purpose === 'relax'; } },
  { id: 'sunglasses', name: '선글라스',    category: '기타',     type: 'suggest', qty: null, reason: '야외 활동이 많을 것 같습니다',
    when: function (t) { return (t.month >= 5 && t.month <= 9) || t.purpose === 'relax'; } },
  { id: 'cap',        name: '모자',       category: '의류',     type: 'suggest', qty: null, reason: '햇빛을 오래 받는 일정입니다',
    when: function (t) { return (t.month >= 5 && t.month <= 9) || t.purpose === 'relax'; } },
  { id: 'swimsuit',   name: '수영복',      category: '의류',     type: 'suggest', qty: null, reason: '물놀이 일정이 있을 수 있습니다',
    when: function (t) { return t.purpose === 'relax'; } },
  { id: 'beachtowel', name: '비치타월',    category: '기타',     type: 'suggest', qty: null, reason: '숙소 수건은 반출이 어려울 수 있습니다',
    when: function (t) { return t.purpose === 'relax'; } },
  { id: 'sandals',    name: '샌들·슬리퍼', category: '의류',     type: 'suggest', qty: null, reason: '숙소에서 신을 신발이 필요합니다',
    when: function (t) { return t.purpose === 'relax' || t.nights >= 1; } },
  { id: 'umbrella',   name: '접이식 우산', category: '기타',     type: 'suggest', qty: null,
    // 영국은 이유 문구를 따로 씁니다. 그 외 지역은 일반 문구를 그대로 씁니다.
    reason: function (t) {
      return t.country === 'uk' ? '영국은 ' + t.month + '월에도 비가 잦습니다' : '이 시기·지역은 비가 잦습니다';
    },
    when: function (t) { return (t.month >= 6 && t.month <= 8) || t.country === 'sea' || t.country === 'eu' || t.country === 'uk'; } },
  { id: 'gloves',     name: '장갑',       category: '의류',     type: 'suggest', qty: null, reason: '기온이 낮은 시기입니다',
    when: function (t) { return t.month >= 11 || t.month <= 2; } },
  { id: 'muffler',    name: '목도리',      category: '의류',     type: 'suggest', qty: null, reason: '기온이 낮은 시기입니다',
    when: function (t) { return t.month >= 11 || t.month <= 2; } },
  { id: 'heatpack',   name: '핫팩',       category: '기타',     type: 'suggest', qty: null, reason: '야외 대기 시간이 길 수 있습니다',
    when: function (t) { return t.month === 12 || t.month <= 2; } },
  { id: 'lipbalm',    name: '립밤',       category: '세면·화장', type: 'suggest', qty: null, reason: '건조한 시기입니다',
    when: function (t) { return t.month >= 11 || t.month <= 3; } },
  { id: 'sneakers',   name: '편한 운동화', category: '의류',     type: 'suggest', qty: null, reason: '하루 이동 거리가 깁니다',
    when: function (t) { return t.purpose === 'tour' || t.purpose === 'active'; } },
  { id: 'ecobag',     name: '접이식 에코백', category: '기타',   type: 'suggest', qty: null, reason: '기념품이나 짐이 늘어납니다',
    when: function (t) { return t.purpose === 'tour'; } },
  { id: 'neckpillow', name: '목베개',      category: '기타',     type: 'suggest', qty: null, reason: '비행 시간이 깁니다',
    when: function (t) { return t.destination === 'overseas'; } },
  { id: 'eyemask',    name: '안대·귀마개', category: '기타',     type: 'suggest', qty: null, reason: '기내나 숙소에서 필요할 수 있습니다',
    when: function (t) { return t.destination === 'overseas'; } },
  { id: 'powerstrip', name: '멀티탭',      category: '전자기기',  type: 'suggest', qty: null, reason: '콘센트가 부족할 수 있습니다',
    when: function (t) { return t.headcount >= 2; } },
  { id: 'ziplock',    name: '압축팩·지퍼백', category: '기타',   type: 'suggest', qty: null, reason: '짐 정리에 도움이 됩니다',
    when: function (t) { return t.nights >= 4; } },
  { id: 'detergent',  name: '세탁세제 시트', category: '기타',   type: 'suggest', qty: null, reason: '중간 세탁이 필요할 수 있습니다',
    when: function (t) { return t.nights >= 7; } },
  { id: 'namecard',   name: '명함',        category: '서류·금융', type: 'suggest', qty: null, reason: '미팅 일정이 있을 수 있습니다',
    when: function (t) { return t.purpose === 'biz'; } },
  { id: 'laptop',     name: '노트북·충전기', category: '전자기기', type: 'suggest', qty: null, reason: '업무 일정이 있습니다',
    when: function (t) { return t.purpose === 'biz'; } },
  { id: 'tripod',     name: '삼각대·셀카봉', category: '전자기기', type: 'suggest', qty: null, reason: '함께 찍을 사진이 많습니다',
    when: function (t) { return t.headcount >= 2 && t.purpose === 'tour'; } },
  { id: 'wipes',      name: '물티슈·손소독제', category: '세면·화장', type: 'suggest', qty: null, reason: '이동 중 필요할 수 있습니다',
    when: null },
  { id: 'mask',       name: '비상용 마스크', category: '의약품',  type: 'suggest', qty: null, reason: '기내나 실내에서 필요할 수 있습니다',
    when: null }
];
// ===== 규칙 테이블 끝 =====
