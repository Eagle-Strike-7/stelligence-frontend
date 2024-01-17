import { PageTitleProps } from '@/types/common/PageTitleProps';
import { Heading } from '@chakra-ui/react';
import React from 'react';

const PageTitle: React.FC<PageTitleProps> = ({ pageTitle }) => {
    return (
        <Heading fontWeight={600} className="mb-4 text-3xl">
            {pageTitle}
        </Heading>
    );
};

export default PageTitle;
