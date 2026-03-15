# CHANGELOG

## 2026-03-15 — Brevo 뉴스레터 구독 연동

### 뉴스레터 구독 API 연동
- `src/app/api/subscribe/route.ts` — Brevo API POST 라우트 생성
  - 이메일 형식 검증 (서버사이드)
  - Brevo `/v3/contacts` API 호출, `listIds: [2]` 구독 처리
  - 응답 케이스 분기: 성공(201/204), 중복(409), 형식오류(400), 서버오류(500)
- `src/components/NewsletterForm.tsx` — UI 동작 전면 교체
  - Supabase 직접 insert → `/api/subscribe` POST 요청으로 변경
  - 상태 5종 처리: idle / loading / success / error / already / invalid_email
  - 성공: "구독이 완료됐어요! 🎉"
  - 중복: "이미 구독 중인 이메일이에요." (노란색)
  - 실패: "잠시 후 다시 시도해주세요." (빨간색)
- `.env.local` — `BREVO_API_KEY` 추가 (서버사이드 전용, `NEXT_PUBLIC_` 없음)
- `supabase/real_projects.sql` — 실제 RWA 프로젝트 10개 INSERT SQL 추가

## 2026-03-14 — MVP 개발 완료 + Vercel 배포

### 프로젝트 초기 설정
- CLAUDE.md 작성 (프로젝트 컨텍스트, 기술 스택, 개발 규칙)
- Next.js 15 + React 19 + TypeScript 5 + Tailwind CSS v4 환경 확인
- `src/lib/types.ts` — `Project`, `Newsletter` 타입 정의
- `src/lib/mockData.ts` — 개발용 mock 프로젝트 12개 작성

### 1단계: 홈 페이지 UI
- `src/app/layout.tsx` — 메타데이터 한국어 설정, Geist 폰트, `lang="ko"`
- `src/app/globals.css` — Tailwind v4 import, 다크 테마 고정 (`#0a0a0a`)
- `src/app/page.tsx` — 히어로 섹션, 통계(120+ 프로젝트 / $8.2B TVL / 15+ 체인), 프로젝트 카드 6개, 뉴스레터 구독 CTA
- `src/components/Header.tsx` — 공통 네비게이션 컴포넌트
- `src/components/ProjectCard.tsx` — TVL, 체인, 상태 배지 포함 카드
- `src/components/NewsletterForm.tsx` — 이메일 구독 폼 (`'use client'`)

### 2단계: 프로젝트 리스트 + 필터
- `src/app/projects/page.tsx` — 서버 컴포넌트, 데이터 fetch 후 클라이언트에 전달
- `src/components/ProjectsClient.tsx` — 카테고리/체인/상태 필터 + 텍스트 검색 (`'use client'`, `useMemo`)
  - 필터: 전체/부동산/채권/미술품/원자재, 전체/Ethereum/Polygon/Solana, 전체/운영중/준비중/종료
  - 결과 없을 때 빈 상태 UI + 필터 초기화 버튼

### 3단계: 프로젝트 상세 페이지
- `src/app/projects/[id]/page.tsx` — 서버 컴포넌트
  - 좌측: 로고, 제목, 상세 설명, 공식 사이트 링크 버튼
  - 우측 사이드바: 카테고리, 체인, 출시일, 상태 배지, TVL
  - 하단: 같은 카테고리 관련 프로젝트 최대 3개
  - `generateMetadata` — 페이지별 SEO 메타태그 자동 생성
  - 존재하지 않는 id → `notFound()` 처리

### 4단계: Supabase 연동
- `@supabase/supabase-js` 패키지 설치
- `src/lib/supabase.ts` — Supabase 클라이언트 + 쿼리 함수 5개
  - `getProjects()`, `getProjectById()`, `getRelatedProjects()`, `getNewsletters()`, `subscribeNewsletter()`
- `.env.local` — 환경변수 템플릿 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `supabase/schema.sql` — `projects`, `subscribers`, `newsletters` 테이블 DDL + RLS 정책
- `supabase/seed.sql` — 샘플 프로젝트 12개 + 뉴스레터 5개 INSERT
- `src/app/page.tsx`, `projects/page.tsx`, `projects/[id]/page.tsx` — mock 데이터 → Supabase 쿼리로 교체
- `src/components/NewsletterForm.tsx` — `setTimeout` mock → `subscribeNewsletter()` 실제 저장으로 교체, 에러 상태 UI 추가

### 5단계: 뉴스레터 아카이브 페이지
- `src/app/newsletter/page.tsx` — 구독 CTA 폼 + 발행 이력 목록 (최신순)
  - 데이터 없을 때 빈 상태 UI 처리
- `src/app/newsletter/loading.tsx` — 스켈레톤 로딩 UI
- `src/lib/types.ts` — `Newsletter` 타입 추가
- `supabase/schema.sql` — `newsletters` 테이블 추가

### 6단계: 배포 준비
- `src/app/layout.tsx` — SEO 강화 (`title` template, `metadataBase`, OG/Twitter 기본값)
- `src/app/page.tsx` — 홈 페이지 OG 메타태그 추가
- loading/error 파일 6개 추가:
  - `src/app/loading.tsx`, `src/app/error.tsx`
  - `src/app/projects/loading.tsx` (스켈레톤 카드 6개), `src/app/projects/error.tsx`
  - `src/app/projects/[id]/loading.tsx`, `src/app/projects/[id]/error.tsx`
- `README.md` — 로컬 개발 설정, Supabase 설정 방법, Vercel 배포 절차, 환경변수 목록
- Vercel 배포 완료 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`)
