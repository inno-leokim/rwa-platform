# RWAbase

국내 유일 RWA(Real World Asset) 프로젝트 트래킹 & 뉴스레터 플랫폼.
부동산, 채권, 미술품, 원자재 토큰화 프로젝트를 한눈에 탐색하고 최신 트렌드를 뉴스레터로 받아보세요.

## 기술 스택

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5
- **스타일링**: Tailwind CSS v4
- **DB**: Supabase (PostgreSQL)
- **배포**: Vercel

## 로컬 개발 환경 설정

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일에 Supabase 프로젝트 정보를 입력합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase 테이블 생성

Supabase 대시보드 → SQL 편집기에서 순서대로 실행합니다.

```
1. supabase/schema.sql  → 테이블 생성 + RLS 정책
2. supabase/seed.sql    → 샘플 프로젝트 12개 삽입
```

### 4. 개발 서버 실행

```bash
npm run dev
# → http://localhost:3000
```

## 주요 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## Vercel 배포

### 필수 환경변수

Vercel 대시보드 → Settings → Environment Variables에 아래 변수를 추가합니다.

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key | `eyJh...` |
| `NEXT_PUBLIC_SITE_URL` | 배포된 사이트 URL (OG 메타태그용) | `https://rwabase.vercel.app` |

### 배포 절차

1. GitHub 저장소에 푸시
2. Vercel에서 저장소 연결 (Framework: Next.js 자동 감지)
3. 위 환경변수 3개 입력 후 Deploy

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              # 공통 레이아웃, SEO 기본값
│   ├── page.tsx                # 홈 페이지
│   ├── loading.tsx             # 전역 로딩 UI
│   ├── error.tsx               # 전역 에러 UI
│   └── projects/
│       ├── page.tsx            # 프로젝트 리스트 + 필터
│       ├── loading.tsx
│       ├── error.tsx
│       └── [id]/
│           ├── page.tsx        # 프로젝트 상세
│           ├── loading.tsx
│           └── error.tsx
├── components/
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsClient.tsx      # 필터+검색 ('use client')
│   └── NewsletterForm.tsx      # 구독 폼 ('use client')
└── lib/
    ├── types.ts
    ├── supabase.ts             # DB 쿼리 함수
    └── mockData.ts             # 미사용 (Supabase 연동 후)
supabase/
├── schema.sql                  # 테이블 DDL + RLS
└── seed.sql                    # 샘플 데이터 12개
```

## MVP 범위 외 (추후 추가 예정)

- 로그인 / 회원가입
- 실시간 온체인 TVL 데이터
- 댓글 / 커뮤니티
- 관리자 페이지
