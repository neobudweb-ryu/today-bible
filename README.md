# 오늘 성경 — 앱 뼈대 (Expo / React Native)

iOS·Android 겸용, 한국어 본문. 포함 기능:

- **읽기·검색**: 66권 책/장 선택, 이전/다음 장, 단어 검색
- **북마크·하이라이트·메모**: 읽기 화면에서 구절을 탭 → 색 4종 / 북마크 / 묵상 메모, "내 노트" 탭에서 모아보기
- **읽기 계획·진도**: 1년 1독(365일), 일차별 체크, 진도율·밀린 날 표시
- **오늘의 말씀·알림**: 날짜별 말씀 카드, 하루 최대 3번 매일 알림

## 1. 프로젝트 만들기 (내 컴퓨터, Node 18 이상)

```bash
npx create-expo-app@latest bible-app --template blank-typescript
cd bible-app
npx expo install @react-native-async-storage/async-storage expo-notifications \
  @react-navigation/native @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context
```

## 2. 이 폴더의 파일 덮어쓰기

`App.tsx`, `src/`, `scripts/` 를 방금 만든 `bible-app` 폴더에 복사합니다.

## 3. 한국어 본문 내려받기

```bash
node scripts/fetch-bible.js
```

`assets/bible.json` 이 만들어지고, 화면에 창세기 1:1과 요한복음 3:16이 출력돼요.
**개역한글이라면 창세기 1:1이 "태초에 하나님이 천지를 창조하시니라"로 나와야 합니다.** 다르게 나오면 알려 주세요.
(영어 KJV가 필요하면 `node scripts/fetch-bible.js en_kjv`)

## 4. app.json 에 알림 플러그인 추가

```json
{
  "expo": {
    "name": "오늘 성경",
    "plugins": ["expo-notifications"]
  }
}
```

## 5. 실행

```bash
npx expo start
```

폰에 **Expo Go** 앱을 설치하고 QR 코드를 스캔하면 바로 확인할 수 있어요.
(알림은 실제 기기에서 테스트하세요. 스토어 배포 시에는 EAS Build 사용.)

## ⚠️ 저작권 — 배포 전 꼭 확인

- 본문 출처(thiagobodruk/bible의 `ko_krv`)는 "Korean Revised"라고만 표기돼 있고, 저장소가 번역본의 저작권을 검증하지 않아요. 개역한글로 보이지만 확인이 필요해요.
- 개역한글은 허가 없이 쓸 수 있다는 글이 많지만 공식 확인은 못 했어요. 스토어에 올리기 전에 대한성서공회(bskorea.or.kr)에 이용 조건을 문의하세요.
- 개역개정·새번역 등은 대한성서공회 소유라 앱에 넣으려면 사전 허가와 사용료가 필요해요.

## 참고

- 사용자 데이터(메모·북마크·진도)는 기기 안(AsyncStorage)에만 저장됩니다.
- 파일 구성
  - `src/data/bible.ts` 책 이름, 본문 로더, 검색, 오늘의 말씀 목록
  - `src/storage.tsx` 상태 저장
  - `src/notify.ts` 알림 예약
  - `src/screens/` 오늘 · 읽기 · 검색 · 계획 · 내 노트
