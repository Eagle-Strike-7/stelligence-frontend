import { PageTitleProps } from '@/types/common/PageTitleProps';
import { Heading } from '@chakra-ui/react';
import React from 'react';

const PageTitle: React.FC<PageTitleProps> = ({ pageTitle }) => {
    return (
        <Heading fontSize="1.5rem" fontWeight={600} className="mb-4">
            {pageTitle}
        </Heading>
    );
};

export default PageTitle;
