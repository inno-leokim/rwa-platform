# RWA 정보 큐레이션 플랫폼 — Claude Code 초기 프롬프트

---

## 🚀 프로젝트 시작 프롬프트 (첫 번째로 붙여넣기)

```
안녕! RWA(Real World Asset) 정보 큐레이션 웹 플랫폼 MVP를 Next.js로 만들려고 해.
전체 기획을 공유할게. 이걸 바탕으로 프로젝트를 단계적으로 개발해줘.

## 프로젝트 개요
- 서비스명: (추후 결정, 임시로 "RWAbase" 사용)
- 목적: 국내 유일 RWA 프로젝트 트래킹 & 뉴스레터 플랫폼
- 타겟: Web3/블록체인에 관심 있는 국내 투자자 및 개발자

## 기술 스택
- Frontend: Next.js 14 (App Router), TypeScript
- 스타일링: Tailwind CSS
- DB: Supabase (PostgreSQL)
- 배포: Vercel
- 뉴스레터: Stibee

## 페이지 구조
- / : 홈 — 히어로 섹션 + 최신 프로젝트 카드 6개 + 뉴스레터 구독 폼
- /projects : 전체 프로젝트 리스트 + 카테고리 필터
- /projects/[id] : 프로젝트 상세 페이지
- /newsletter : 뉴스레터 아카이브 페이지

## 데이터 구조 (Supabase projects 테이블)
{
  id: uuid,
  name: string,           // 프로젝트명
  category: enum,         // 'real_estate' | 'bond' | 'art' | 'commodity'
  chain: string,          // 'Ethereum' | 'Polygon' | 'Solana' 등
  tvl: string,            // "$1.2M" 형식
  status: enum,           // 'active' | 'upcoming' | 'closed'
  description: string,    // 한줄 설명
  detail: text,           // 상세 설명
  website: string,        // 공식 사이트 URL
  launch_date: string,    // "2024-01" 형식
  logo_url: string,       // 로고 이미지 URL
  created_at: timestamp
}

## 디자인 방향
- 다크 테마 기반 (블록체인/Web3 느낌)
- 신뢰감 있고 데이터 중심적인 UI
- 과하게 크립토 느낌 X, 깔끔하고 전문적인 느낌
- 모바일 반응형 필수

## MVP 범위 (포함)
- 프로젝트 카드 리스트 & 카테고리 필터
- 프로젝트 상세 페이지
- 뉴스레터 구독 폼 (이메일 수집)
- 반응형 UI

## MVP 범위 (제외 - 나중에 추가)
- 로그인/회원가입
- 실시간 온체인 데이터
- 댓글/커뮤니티
- 관리자 페이지

---

먼저 1단계로 프로젝트 기본 셋업과 홈페이지 UI부터 만들어줘.
Supabase 연동 전에 mock 데이터로 먼저 UI를 완성하자.
```

---

## 📋 단계별 후속 프롬프트

### 2단계 — 프로젝트 리스트 & 필터
```
홈페이지 UI가 완성됐어. 이제 /projects 페이지를 만들어줘.
- 카테고리 필터 (전체 / 부동산 / 채권 / 미술품 / 원자재)
- 체인 필터 (전체 / Ethereum / Polygon / Solana)
- 상태 필터 (전체 / 운영중 / 준비중 / 종료)
- 프로젝트 카드 그리드 (3열, 모바일 1열)
- 검색 기능 (프로젝트명 검색)
mock 데이터로 먼저 구현해줘.
```

### 3단계 — 프로젝트 상세 페이지
```
이제 /projects/[id] 상세 페이지를 만들어줘.
- 프로젝트 기본 정보 (이름, 카테고리, 체인, TVL, 상태)
- 상세 설명 섹션
- 공식 사이트 링크 버튼
- 관련 프로젝트 추천 (같은 카테고리 3개)
- 뒤로가기 네비게이션
```

### 4단계 — Supabase 연동
```
UI가 완성됐어. 이제 Supabase 연동을 해줘.
- supabase 클라이언트 설정 (.env.local 포함)
- projects 테이블 스키마 SQL 작성
- mock 데이터를 실제 Supabase 쿼리로 교체
- 뉴스레터 구독 폼 → Supabase subscribers 테이블에 저장
환경변수는 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 사용
```

### 5단계 — 마무리 & 배포 준비
```
거의 다 됐어. 배포 전 마무리 작업 해줘.
- SEO 메타태그 추가 (각 페이지별)
- loading.tsx, error.tsx 추가
- 샘플 프로젝트 데이터 10개 시드 SQL 작성
- Vercel 배포를 위한 환경변수 목록 정리
- README.md 작성
```

---

## 💡 Claude Code 사용 팁

- 한 번에 너무 많이 요청하지 말고 **단계별로** 진행
- UI 완성 후 → DB 연동 순서로 진행하면 디버깅이 쉬움
- "이전 코드 기반으로 수정해줘" 라고 하면 컨텍스트 유지됨
- 에러 발생 시 에러 메시지 전체를 그대로 붙여넣기
