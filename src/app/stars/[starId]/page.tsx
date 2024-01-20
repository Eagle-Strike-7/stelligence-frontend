import React from 'react';
import Wrapper from '@/components/Common/Wrapper';
import { Box } from '@chakra-ui/react';
import StarInfo from './Star/StarInfo/StarInfo';
import StarContent from './Star/StarContent/StarContent';
import StarContributor from './Star/StarContributor/StarContributor';

// NOTE : 특정 글 상세보기 페이지
const page = () => {
    return (
        <Wrapper>
            <Box className="flex w-full flex-col">
                <StarInfo />
                <StarContent />
                <StarContributor />
            </Box>
        </Wrapper>
    );
};

export default page;
