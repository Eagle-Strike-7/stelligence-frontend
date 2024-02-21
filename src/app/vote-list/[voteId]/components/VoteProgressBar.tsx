import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
// NOTE 프로그래스 바에 애니메이션
const MotionBox = motion(Box);

const VoteProgressBar = ({
  agree,
  disagree,
}: {
  agree: number;
  disagree: number;
}) => {
  const totalVotes = agree + disagree;
  const bgColor = totalVotes === 0 ? 'gray.500' : undefined;

  // NOTE 애니메이션
  const agreeControls = useAnimation();
  const disagreeControls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          agreeControls.start({ width: `${(agree / totalVotes) * 100}%` });
          disagreeControls.start({
            width: `${(disagree / totalVotes) * 100}%`,
          });
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [agree, disagree, agreeControls, disagreeControls, totalVotes]);

  return (
    <Box
      height="2rem"
      width="100%"
      bg={bgColor}
      borderRadius="1rem"
      position="relative"
    >
      {totalVotes > 0 && (
        <>
          <MotionBox
            ref={ref}
            height="100%"
            width={`${(agree / totalVotes) * 100}%`}
            bg="blue.500"
            borderLeftRadius="1rem"
            borderRightRadius={disagree === 0 ? '1rem' : '0'}
            position="absolute"
            left="0"
            initial={{ width: 0 }}
            animate={agreeControls}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <MotionBox
            height="100%"
            width={`${(disagree / totalVotes) * 100}%`}
            bg="red.500"
            borderRightRadius="1rem"
            borderLeftRadius={agree === 0 ? '1rem' : '0'}
            position="absolute"
            right="0"
            initial={{ width: 0 }}
            animate={disagreeControls}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </>
      )}
    </Box>
  );
};

export default VoteProgressBar;
