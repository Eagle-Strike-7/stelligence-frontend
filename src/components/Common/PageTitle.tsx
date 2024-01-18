import { Heading } from '@chakra-ui/react';
import React from 'react';

const PageTitle: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
    return (
        <Heading size="lg" fontWeight={600}>
            {pageTitle}
        </Heading>
    );
};

export default PageTitle;
