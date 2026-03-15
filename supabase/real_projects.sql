-- =====================================================
-- 실제 RWA 프로젝트 데이터 10개
-- Supabase SQL Editor에서 그대로 실행 가능
-- 기존 샘플 데이터(seed.sql)와 별개로 추가 가능
-- =====================================================

insert into projects (name, category, chain, tvl, status, description, detail, website, launch_date, logo_url) values

-- 1. Ondo Finance
(
  'Ondo Finance',
  'bond',
  'Ethereum',
  '$500M+',
  'active',
  '미국 국채를 온체인 토큰으로 발행하는 기관급 RWA 프로토콜',
  'Ondo Finance는 미국 국채(T-Bill)와 단기 채권을 토큰화하여 누구나 온체인에서 안전한 수익을 얻을 수 있게 하는 프로토콜입니다. 대표 상품으로 USDY(달러 수익 연동 토큰)와 OUSG(미국 국채 ETF 토큰)가 있으며, 기관 수준의 금융상품을 DeFi 생태계에 연결합니다. 글로벌 자산운용사 BlackRock의 BUIDL 펀드와도 연계되어 있습니다.',
  'https://ondo.finance',
  '2022-01',
  ''
),

-- 2. Maple Finance
(
  'Maple Finance',
  'bond',
  'Ethereum',
  '$200M+',
  'active',
  '기관 투자자를 위한 온체인 신용 시장 및 무담보 대출 프로토콜',
  'Maple Finance는 검증된 기관 차입자에게 무담보 또는 저담보 대출을 제공하는 온체인 신용 프로토콜입니다. 풀 운영자(Pool Delegate)가 신용 평가를 담당하고, 대출자는 풀에 유동성을 공급하여 이자 수익을 얻습니다. 주로 암호화폐 트레이딩 회사, 핀테크 기업, Web3 프로젝트에 대출을 제공하며, 투명한 온체인 신용 기록을 통해 전통 금융의 대출 방식을 혁신하고 있습니다.',
  'https://maple.finance',
  '2021-05',
  ''
),

-- 3. RealT
(
  'RealT',
  'real_estate',
  'Ethereum',
  '$60M+',
  'active',
  '미국 부동산을 ERC-20 토큰으로 분할 소유할 수 있는 부동산 토큰화 플랫폼',
  'RealT는 미국 내 실제 부동산을 ERC-20 토큰(RealToken)으로 쪼개어 전 세계 누구나 소액으로 부동산에 투자할 수 있도록 합니다. 투자자는 보유 토큰 비율에 따라 임대 수익을 매일 스테이블코인(USDC)으로 받을 수 있습니다. Detroit, Chicago 등 미국 주요 도시의 주거용 부동산 수백 개가 토큰화되어 있으며, 법적으로는 LLC를 통해 실제 소유권과 연결됩니다.',
  'https://realt.co',
  '2019-01',
  ''
),

-- 4. Centrifuge
(
  'Centrifuge',
  'bond',
  'Ethereum',
  '$300M+',
  'active',
  '실물 자산을 NFT 담보로 전환해 DeFi에서 유동성을 조달하는 인프라 프로토콜',
  'Centrifuge는 기업이 보유한 매출채권, 대출채권, 재고 등 실물 자산을 NFT로 담보화(Asset NFT)하고, 이를 기반으로 Tinlake 풀에서 DeFi 유동성을 조달할 수 있게 합니다. MakerDAO, Aave 등 주요 DeFi 프로토콜과 연동되어 있으며, Polkadot 기반의 Centrifuge Chain을 자체 운영합니다. 중소기업의 공급망 금융 문제를 블록체인으로 해결하는 선도적인 RWA 인프라로 평가받습니다.',
  'https://centrifuge.io',
  '2021-09',
  ''
),

-- 5. Propy
(
  'Propy',
  'real_estate',
  'Ethereum',
  '$40M+',
  'active',
  '스마트 컨트랙트로 부동산 거래를 자동화하는 글로벌 블록체인 부동산 플랫폼',
  'Propy는 부동산 매매 계약, 에스크로, 소유권 이전 등 복잡한 거래 과정을 스마트 컨트랙트로 자동화합니다. 미국 내 부동산을 NFT로 발행하여 법적 소유권과 연결하는 선례를 만들었으며, 2022년 미국 최초 NFT 부동산 경매를 성사시켰습니다. 미국, 유럽, 아시아 등 전 세계 부동산 중개인 네트워크와 협력하여 국경을 초월한 부동산 거래를 가능하게 합니다.',
  'https://propy.com',
  '2017-01',
  ''
),

-- 6. Goldfinch
(
  'Goldfinch',
  'bond',
  'Ethereum',
  '$100M+',
  'active',
  '개발도상국 기업에 암호화폐 담보 없이 대출을 제공하는 탈중앙 신용 프로토콜',
  'Goldfinch는 아프리카, 동남아, 라틴아메리카 등 신흥국 핀테크 기업에 온체인 대출을 제공합니다. 기존 DeFi와 달리 암호화폐 과담보가 필요 없으며, 전문 감사자(Auditor)와 후순위 투자자(Backer)가 신용 평가를 수행합니다. 대출 자금은 실물 경제에 투입되어 소상공인, 농부, 학생 등에게 마이크로파이낸싱으로 연결됩니다. Andreessen Horowitz(a16z) 등으로부터 투자를 받았습니다.',
  'https://goldfinch.finance',
  '2021-07',
  ''
),

-- 7. Landshare
(
  'Landshare',
  'real_estate',
  'BSC',
  '$10M+',
  'active',
  'BSC 기반 미국 부동산 분할 투자 플랫폼, LAND 토큰으로 임대 수익 공유',
  'Landshare는 Binance Smart Chain 위에서 미국 부동산을 토큰화하여 소액 투자자도 부동산 임대 수익에 참여할 수 있게 합니다. 플랫폼 내 LAND 토큰을 스테이킹하면 부동산 수익의 일부를 분배받으며, 부동산 가치 상승분도 토큰 가격에 반영됩니다. BNB Chain의 낮은 수수료를 활용해 소액 투자자 접근성을 높인 것이 특징입니다.',
  'https://landshare.io',
  '2021-09',
  ''
),

-- 8. Blocksquare
(
  'Blocksquare',
  'real_estate',
  'Ethereum',
  '$50M+',
  'active',
  '유럽 부동산 토큰화 인프라를 제공하는 White-label SaaS 플랫폼',
  'Blocksquare는 부동산 개발사와 투자 플랫폼이 자체 토큰화 서비스를 구축할 수 있도록 White-label 인프라를 제공합니다. BST(Blocksquare Token) 생태계를 통해 전 세계 부동산 자산을 온체인으로 가져오며, Oceanpoint라는 자체 투자 플랫폼도 운영합니다. 슬로베니아 기반으로 EU 규제 프레임워크 내에서 운영하며 법적 준수성을 강조합니다.',
  'https://blocksquare.io',
  '2018-01',
  ''
),

-- 9. Swarm Markets
(
  'Swarm Markets',
  'bond',
  'Polygon',
  '$30M+',
  'active',
  '독일 금융 규제 라이선스를 보유한 합법적 주식·채권 토큰화 DeFi 플랫폼',
  'Swarm Markets는 독일 연방금융감독청(BaFin) 라이선스를 취득한 규제 준수 DeFi 플랫폼으로, 미국 주식(TSLA, AAPL 등), 국채, ETF를 Polygon 블록체인에서 토큰화하여 거래할 수 있게 합니다. KYC/AML 절차를 거친 사용자만 이용 가능하며, 전통 금융과 DeFi의 교차점에서 기관 투자자들에게 규제 준수 RWA 접근 경로를 제공합니다.',
  'https://swarm.markets',
  '2021-06',
  ''
),

-- 10. Tangible
(
  'Tangible',
  'real_estate',
  'Polygon',
  '$80M+',
  'active',
  'Polygon 기반 실물 부동산 NFT 마켓플레이스 및 부동산 담보 스테이블코인 USDR 발행',
  'Tangible은 영국, 유럽 부동산을 TNFT(Tangible NFT)로 토큰화하고, 이를 담보로 USDR(Real USD) 스테이블코인을 발행합니다. 부동산 외에도 금괴, 와인, 명품 시계 등 다양한 실물 자산을 NFT로 거래할 수 있습니다. USDR 보유자는 임대 수익 기반의 실시간 리베이스 수익을 얻으며, 부동산 가치 상승과 임대 수익을 동시에 누릴 수 있는 구조입니다.',
  'https://tangible.store',
  '2022-05',
  ''
);
