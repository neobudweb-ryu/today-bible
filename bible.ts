// 성경 데이터 로더. assets/bible.json 은 `node scripts/fetch-bible.js` 로 먼저 만들어야 합니다.
import raw from '../../assets/bible.json';

export const BOOK_KO = [
  '창세기', '출애굽기', '레위기', '민수기', '신명기', '여호수아', '사사기', '룻기',
  '사무엘상', '사무엘하', '열왕기상', '열왕기하', '역대상', '역대하', '에스라', '느헤미야',
  '에스더', '욥기', '시편', '잠언', '전도서', '아가', '이사야', '예레미야', '예레미야애가',
  '에스겔', '다니엘', '호세아', '요엘', '아모스', '오바댜', '요나', '미가', '나훔', '하박국',
  '스바냐', '학개', '스가랴', '말라기',
  '마태복음', '마가복음', '누가복음', '요한복음', '사도행전', '로마서', '고린도전서', '고린도후서',
  '갈라디아서', '에베소서', '빌립보서', '골로새서', '데살로니가전서', '데살로니가후서',
  '디모데전서', '디모데후서', '디도서', '빌레몬서', '히브리서', '야고보서', '베드로전서',
  '베드로후서', '요한일서', '요한이서', '요한삼서', '유다서', '요한계시록',
];

// [책 인덱스][장-1][절-1] = 본문
export const bible = raw as unknown as string[][][];

export type ChapterRef = { b: number; c: number };

// 1189개 장을 성경 순서대로 펼친 목록 (읽기 계획에서 사용)
export const ALL_CHAPTERS: ChapterRef[] = bible.flatMap((chs, b) =>
  chs.map((_, i) => ({ b, c: i + 1 }))
);

export const verseText = (b: number, c: number, v: number) =>
  bible[b]?.[c - 1]?.[v - 1] ?? '';

export const refLabel = (b: number, c: number, v?: number) =>
  v ? `${BOOK_KO[b]} ${c}:${v}` : `${BOOK_KO[b]} ${c}장`;

export type Hit = { b: number; c: number; v: number; t: string };

// 본문에서 입력한 모든 단어가 포함된 구절 검색
export function searchVerses(query: string, limit = 200): Hit[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const hits: Hit[] = [];
  for (let b = 0; b < bible.length; b++) {
    for (let c = 0; c < bible[b].length; c++) {
      for (let v = 0; v < bible[b][c].length; v++) {
        const t = bible[b][c][v];
        const low = t.toLowerCase();
        if (words.every((w) => low.includes(w))) {
          hits.push({ b, c: c + 1, v: v + 1, t });
          if (hits.length >= limit) return hits;
        }
      }
    }
  }
  return hits;
}

// 오늘의 말씀 후보 [책 인덱스, 장, 절] — 날짜에 따라 순환
export const DAILY_VERSES: [number, number, number][] = [
  [42, 3, 16], // 요한복음 3:16
  [18, 23, 1], // 시편 23:1
  [19, 3, 5], // 잠언 3:5
  [22, 41, 10], // 이사야 41:10
  [49, 4, 13], // 빌립보서 4:13
  [44, 8, 28], // 로마서 8:28
  [23, 29, 11], // 예레미야 29:11
  [39, 11, 28], // 마태복음 11:28
  [5, 1, 9], // 여호수아 1:9
  [18, 46, 1], // 시편 46:1
  [44, 12, 2], // 로마서 12:2
  [46, 12, 9], // 고린도후서 12:9
  [24, 3, 22], // 예레미야애가 3:22
  [32, 6, 8], // 미가 6:8
  [57, 11, 1], // 히브리서 11:1
  [61, 4, 19], // 요한일서 4:19
  [58, 1, 5], // 야고보서 1:5
];
