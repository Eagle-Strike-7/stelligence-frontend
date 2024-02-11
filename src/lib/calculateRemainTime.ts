const calculateRemainTime = (endAt: string) => {
  const now = new Date();
  const endTime = new Date(endAt);
  const remainTime = endTime.getTime() - now.getTime();
  if (!Number.isNaN(endTime.getTime()) && remainTime >= 0) {
    const minutes = Math.floor(remainTime / 60 / 1000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days}일 ${hours % 24}시간 ${minutes % 60}분`;
  }
  return '0일 0시간 0분';
};

export default calculateRemainTime;
