import { Heading } from '@chakra-ui/react';
import React from 'react';

const PageTitle = (pageTitle: string) => {
    return (
        <Heading fontWeight={600} className="mb-4 text-3xl">
            {pageTitle}
        </Heading>
    );
};

export default PageTitle;
