import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Heading
                    size="lg"
                    fontSize="2rem"
                    className="text-white text-center align-middle"
                >
                    Stelligence
                </Heading>
            </Link>
        </div>
    );
};

export default Logo;
