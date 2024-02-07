// NOTE : 2024-02-07T09:39:01.406Z -> 2024-02-07 09:39
const formatDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split('T');
  const [hour, minute] = timePart.split(':');

  return `${datePart} ${hour}:${minute}`;
};

export default formatDate;
