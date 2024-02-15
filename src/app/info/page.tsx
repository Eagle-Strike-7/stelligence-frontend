'use client';

import PageTitleDescription from '@/components/Common/PageTitleDescription';
import Wrapper from '@/components/Common/Wrapper';
import React from 'react';

const page = () => {
  return (
    <Wrapper>
      <PageTitleDescription
        title="은하수 여행 가이드"
        description="stelligence 이용 가이드를 확인하세요!"
      />
      <div>
        <div className="text-text-dark leading-8">
          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h1 className="text-xl font-bold">사이트 소개</h1>
            <p>- 그래프 뷰 기반 사용자 참여형 지식 공유 플랫폼</p>
            <p>- 함께 만들어나가는 지식의 별자리</p>
          </div>

          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h1 className="text-xl font-bold">목적</h1>
            <ol>
              <li>
                서로 다른 글을 링크를 통해 연결하여 큰 지식의 네트워크를 구축
              </li>
              <li>그래프를 활용한 지식의 네트워크 시각화</li>
              <li>사용자 참여형 정보 공유의 새로운 장 마련</li>
              <li>
                컨셉트 맵을 활용해 글의 계층간 연결성을 갖게 하고, 이를 시각화
                하여 기존 검색 엔진의 한계를 극복
              </li>
              <li>상/하위 구조에 따른 개념의 맥락 제공</li>
              <li>사용자 참여형 정보 공유의 장 마련</li>
            </ol>
            <p>
              <strong>
                {`"None of us is as smart as all of us." : 우리 중 누구도 우리
                모두보다 똑똑할 순 없다.`}
              </strong>
            </p>
            <p>
              - 함께 정보를 공유하고 협력함으로써 더 큰 지식 네트워크를 구축
              가능
            </p>
            <p>- 투표를 통한 최소한의 정보 신뢰성 보장</p>
          </div>
          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h2 className="text-xl font-bold">컨셉</h2>
            <p>- 전체 정보의 집합 - ‘우주’</p>
            <p>- 하나의 카테고리 - ‘은하’</p>
            <ul>
              <li>예) IT → IT은하</li>
            </ul>
            <p>- 하나의 글 : ‘별’</p>
            <ul>
              <li>예) DFS → DFS 별</li>
            </ul>
            <p>- 글 간 관련성 - ‘링크’</p>
            <p>- 글 간 상/하위 개념 - ‘계층’</p>
            <p>
              → 별들이 모여 은하를 이루는 것처럼, 글들이 모여 지식의 은하를
              이루게 됩니다.
            </p>
          </div>
          {/* <!-- 계정 생성 및 로그인 방식 섹션 등 추가적인 섹션들도 비슷한 방식으로 변환 가능 --> */}
          {/*     
    <!-- 콘텐츠 기여 방법 섹션 예시 --> */}

          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h2 className="text-xl font-bold">콘텐츠 기여 방법</h2>
            <h3>새로운 글 생성</h3>
            <p>- 글 생성 기준</p>
            <ul>
              <li>제목 중복 X</li>
            </ul>
            <p>- 이미지나 미디어 추가하는 방법</p>
            {/* <!-- 이하 생략 --> */}
            {/* <!-- 기존 글 편집 방법 섹션 예시 --> */}
            <br />
            <h3 className="text-lg font-bold">기존 글 편집 방법</h3>
            <p>- 수정 요청</p>
            <p>- 수정 요청이란? 이미 생성된 글에서</p>
            {/* <!-- 이하 생략 --> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
