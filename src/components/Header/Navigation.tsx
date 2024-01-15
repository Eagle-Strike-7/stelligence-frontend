import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <div className="ml-20">
            <ul>
                <li className="inline mr-2">
                    <Link href="/voteList">
                        <Heading size="md" className="inline">
                            투표
                        </Heading>
                    </Link>
                </li>

                <li className="inline">
                    <Link href="/debateList">
                        <Heading size="md" className="inline">
                            토론
                        </Heading>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
