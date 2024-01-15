import { Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Login = () => {
    return (
        <div className="mr-20">
            <Tooltip
                hasArrow
                defaultIsOpen
                arrowSize={10}
                label="우주로 출발하기🚀"
                placement="left"
                color="black"
                backgroundColor="#f6f6f6"
                size="lg"
                padding="0.25rem 0.75rem"
                className="rounded-md"
            >
                <Link href="/login">로그인</Link>
            </Tooltip>
        </div>
    );
};

export default Login;
