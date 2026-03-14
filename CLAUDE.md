# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# RWA Base — 프로젝트 컨텍스트

## 프로젝트 개요
- **서비스명**: RWAbase (임시)
- **목적**: 국내 유일 RWA(Real World Asset) 프로젝트 트래킹 & 뉴스레터 플랫폼
- **타겟**: Web3/블록체인에 관심 있는 국내 투자자 및 개발자

## 기술 스택
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5
- **스타일링**: Tailwind CSS v4 (`@import "tailwindcss"` 방식, `@tailwind` 디렉티브 사용 안 함)
- **DB**: Supabase (PostgreSQL) — `@supabase/supabase-js` 설치 완료
- **배포**: Vercel
- **뉴스레터**: Stibee

## 개발 명령어
```bash
npm run dev     # 개발 서버 실행 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint 검사
```

테스트 설정 없음 (MVP 단계).

## 개발 TODO

| 단계 | 작업 | 완료 |
|------|------|:----:|
| 1 | 홈 페이지 UI (히어로, 통계, 프로젝트 카드 6개, 뉴스레터 구독 폼) | O |
| 2 | 프로젝트 리스트 + 카테고리/체인/상태 필터 + 검색 (`/projects`) | O |
| 3 | 프로젝트 상세 페이지 (`/projects/[id]`) | O |
| 4 | Supabase 클라이언트 설정 (`lib/supabase.ts`, `.env.local`) | O |
| 4 | projects 테이블 스키마 SQL 작성 (`supabase/schema.sql`) | O |
| 4 | mock 데이터 → 실제 Supabase 쿼리로 교체 | O |
| 4 | 뉴스레터 구독 폼 → `subscribers` 테이블 저장 | O |
| 5 | `/newsletter` 아카이브 페이지 | O |
| 6 | 페이지별 SEO 메타태그 (title template, OG tags) | O |
| 6 | `loading.tsx`, `error.tsx` 추가 (앱 전체 + 각 라우트) | O |
| 6 | 샘플 프로젝트 12개 시드 SQL (`supabase/seed.sql`) | O |
| 6 | Vercel 배포 환경변수 정리 (`README.md`) | O |
| 6 | `README.md` 작성 | O |

## 현재 구현 상태 (2026-03-14 기준) — MVP 완료 + Vercel 배포 완료 ✅

### 완료
- **1단계: 홈 페이지** — 히어로, 통계, 프로젝트 카드 6개, 뉴스레터 구독 폼
- **2단계: 프로젝트 리스트** — 카테고리/체인/상태 필터 + 텍스트 검색 (`/projects`)
- **3단계: 프로젝트 상세** — 기본 정보 사이드바, 상세 설명, 공식 사이트 링크, 관련 프로젝트 3개 (`/projects/[id]`)
- **4단계: Supabase 연동** — 클라이언트 설정, 스키마 SQL, 쿼리 교체, 구독 저장
- **5단계: 뉴스레터** — 아카이브 페이지 (`/newsletter`), 구독 폼, 발행 이력 목록
- **6단계: 배포 준비** — SEO 메타태그, loading/error.tsx, 시드 SQL 12개, README, Vercel 배포

## 실제 파일 구조
```
src/
├── app/
│   ├── layout.tsx              # 공통 레이아웃, SEO title template/OG 기본값
│   ├── globals.css             # Tailwind v4 import, 다크 테마 고정
│   ├── page.tsx                # 홈 페이지 (서버 컴포넌트, Supabase)
│   ├── loading.tsx             # 전역 로딩 UI (스피너)
│   ├── error.tsx               # 전역 에러 UI ('use client')
│   ├── newsletter/
│   │   ├── page.tsx            # 뉴스레터 아카이브 (서버, Supabase)
│   │   └── loading.tsx         # 스켈레톤 UI
│   └── projects/
│       ├── page.tsx            # 프로젝트 리스트 (서버 → ProjectsClient)
│       ├── loading.tsx         # 스켈레톤 카드 6개
│       ├── error.tsx           # 에러 UI ('use client')
│       └── [id]/
│           ├── page.tsx        # 프로젝트 상세 (서버, generateMetadata 포함)
│           ├── loading.tsx     # 상세 스켈레톤
│           └── error.tsx       # 에러 UI ('use client')
├── components/
│   ├── Header.tsx              # 공통 네비게이션 (모든 페이지 공유)
│   ├── ProjectCard.tsx         # 프로젝트 카드 (Link 래핑, 서버)
│   ├── ProjectsClient.tsx      # 필터+검색 로직 ('use client', useMemo)
│   └── NewsletterForm.tsx      # 이메일 구독 폼 ('use client', Supabase insert)
└── lib/
    ├── types.ts                # Project, ProjectCategory, ProjectStatus 타입
    ├── supabase.ts             # Supabase 클라이언트 + getProjects/getProjectById/getRelatedProjects/getNewsletters/subscribeNewsletter
    └── mockData.ts             # 12개 mock 프로젝트 (미사용, 참고용)
supabase/
├── schema.sql                  # projects + subscribers + newsletters 테이블 DDL, RLS 정책
└── seed.sql                    # 샘플 프로젝트 12개 + 뉴스레터 5개 INSERT
```

## Supabase 설정 방법
1. `.env.local`에 실제 값 입력:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
   ```
2. Supabase 대시보드 SQL 편집기에서 `supabase/schema.sql` 실행
3. RLS 정책 확인: `projects` 전체 읽기 허용, `subscribers` insert만 허용

## 데이터 구조
```typescript
type Project = {
  id: string
  name: string
  category: 'real_estate' | 'bond' | 'art' | 'commodity'
  chain: string           // 'Ethereum' | 'Polygon' | 'Solana' 등
  tvl: string             // "$1.2M" 형식
  status: 'active' | 'upcoming' | 'closed'
  description: string     // 한줄 설명
  detail: string          // 상세 설명
  website: string
  launch_date: string     // "2024-01" 형식
  logo_url: string
  created_at: string
}
```

## 디자인 규칙
- 다크 테마 기반 (배경: `#0a0a0a`, 카드: `#111111`)
- 신뢰감 있고 데이터 중심적인 UI — 과하게 크립토 느낌 X
- 모바일 반응형 필수
- 컬러 포인트: 에메랄드 그린 (`#10b981`)

## 개발 규칙
- 서버 컴포넌트 우선 사용, 클라이언트 컴포넌트는 필요할 때만 (`'use client'`)
- 환경변수: `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## MVP 범위 외 (나중에 추가)
로그인/회원가입, 실시간 온체인 데이터, 댓글/커뮤니티, 관리자 페이지
