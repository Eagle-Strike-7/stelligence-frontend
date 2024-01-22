import React from 'react';
import StarSection, { StarSectionProps } from '@/components/Common/StarSection';
import dummyContentData from '@/constants/dummyContentData';
import { Button } from '@chakra-ui/react';

// NOTE : 글의 내용을 보여주는 컴포넌트
const StarContent = () => {
    return (
        <div className="flex flex-col w-full mb-16">
            {dummyContentData.map((data: StarSectionProps) => {
                return (
                    <div key={data.id} className="flex flex-col w-full mb-6">
                        <div className="flex flex-row mb-2 justify-between items-center justify-items-center">
                            <span className="text-xl font-bold align-middle">
                                {data.sectionTitle}
                            </span>
                            <Button
                                size="md"
                                colorScheme="gray"
                                variant="outline"
                                h="2rem"
                            >
                                편집
                            </Button>
                        </div>
                        <StarSection sectionContent={data.sectionContent} />
                    </div>
                );
            })}
        </div>
    );
};

export default StarContent;
