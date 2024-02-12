import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

interface HistoryTimelineProps {
  maxVersionNum: number;
}

const HistoryTimeline = ({ maxVersionNum }: HistoryTimelineProps) => {
  const versionNumList = Array.from({ length: maxVersionNum }, (_, i) => {return i + 1});

  // 해당 버전 상세페이지로 이동
  const handleGoToHistoryDetail = () => {
    console.log('historydetail');
  };

  return (
    <Timeline position="alternate" className="mt-8">
      {versionNumList.map(versionNumber => {return (
        <TimelineItem key={versionNumber}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {versionNumber === maxVersionNum ? null : <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent
            color="white"
            onClick={handleGoToHistoryDetail}
            className="cursor-pointer"
          >
            버전 {versionNumber}
          </TimelineContent>
        </TimelineItem>
      )})}
    </Timeline>
  );
};

export default HistoryTimeline;
