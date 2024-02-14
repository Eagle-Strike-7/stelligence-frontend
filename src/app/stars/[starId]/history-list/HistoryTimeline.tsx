import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { usePathname, useRouter } from 'next/navigation';

interface HistoryTimelineProps {
  maxVersionNum: number;
}

const HistoryTimeline = ({ maxVersionNum }: HistoryTimelineProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const versionNumList = Array.from({ length: maxVersionNum }, (_, i) => {
    return i + 1;
  });

  // NOTE 이동할 상세페이지 경로 찾기
  const pathnameList = pathname.split('/');
  pathnameList.pop();
  const newPath = pathnameList.join('/');

  const handleGoToHistoryDetail = (e: React.MouseEvent) => {
    console.log('historydetail');
    router.push(`${newPath}?revision=${e.currentTarget.id}`);
  };

  return (
    <Timeline position="alternate" className="mt-8">
      {versionNumList.map(versionNumber => {
        return (
          <TimelineItem key={versionNumber}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {versionNumber === maxVersionNum ? null : <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent
              id={versionNumber.toString()}
              color="white"
              onClick={handleGoToHistoryDetail}
              className="cursor-pointer"
            >
              버전 {versionNumber}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default HistoryTimeline;
