import axios from 'axios';

// TODO Document 요청과 합치기
const getDocumentMaxVersion = async (documentId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/${documentId}`,
  );
  return data.results;
};

export default getDocumentMaxVersion;
