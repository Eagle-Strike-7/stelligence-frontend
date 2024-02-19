'use client';

import PageTitleDescription from '@/components/Common/Title/PageTitleDescription';
import Wrapper from '@/components/Common/Wrapper';
import React from 'react';

const page = () => {
  return (
    <Wrapper>
      <PageTitleDescription
        title="은하수 여행 가이드"
        description="🌟 탐험가 여러분, 지식의 별자리를 찾아 떠나볼 준비가 되셨나요? 🌟"
      />
      <div>
        <div className="text-text-dark leading-8">
          <div className="bg-transparent p-4 rounded-md my-4 text-lg">
            <h1 className="text-xl font-bold">
              🌟 탐험가 여러분, 지식의 별자리를 찾아 떠나볼 준비가 되셨나요? 🌟
            </h1>
            <br />
            <p>
              Stelligence에 오신 걸 진심으로 환영해요! 여기는 단순히 정보를
              검색하는 것을 넘어, 여러분이 지식의 탐험가이자, 창조자, 그리고
              길잡이가 될 수 있는 공간이에요.
            </p>
          </div>

          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h1 className="text-xl font-bold">
              📚 여러분의 지식이 새로운 별자리를 탄생시켜요
            </h1>
            <p>
              여러분이 알고 있는 것을 나누고, 혹시라도 잘못된 정보를 발견하시면
              그걸 바로잡으며, 함께 지식의 세계를 더욱 정확하고 아름답게
              만들어가요. 여러분의 한 마디 한 마디가 Stelligence의 지식 우주를
              더욱 빛나게 합니다.
            </p>
          </div>
          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h2 className="text-xl font-bold">
              🌌 그래프로 보는 지식의 네트워크
            </h2>
            <p>
              우리 플랫폼은 단지 정보를 나열하는 것이 아니에요. 그래프 뷰를 통해
              개념들이 어떻게 서로 연결되어 있는지 한눈에 볼 수 있어요. CS
              개념이 복잡하게 느껴질 때, Stelligence가 여러분의 이해를
              돕겠습니다.
            </p>
          </div>

          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h2 className="text-xl font-bold">
              💬 토론과 투표로 함께 성장해요
            </h2>

            <p>
              잘못된 정보를 수정 요청할 뿐만 아니라, 여러분의 의견을 투표로
              표현할 수도 있어요. 다른 사람들과 의견을 나누고, 생각을 교환하는
              것으로 지식의 깊이가 더해집니다. 여러분의 참여가 우리 지식의 질을
              한층 더 높여요.
            </p>
          </div>
          <div className="bg-[#292929] p-4 rounded-md my-4">
            <h2 className="text-xl font-bold">
              💌 여러분의 피드백으로 더 나아가요
            </h2>

            <p>
              사이트에 들러서 여러분의 소중한 의견을 남겨주세요. 페이지 우측
              하단의 ?(물음표) 버튼을 누르면 바로 피드백을 남길 수 있는 구글
              폼이 있어요. 여러분의 목소리가 Stelligence를 더욱 빛나게 할
              거예요.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
