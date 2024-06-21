export default function Card() {
  return (
    <div className="flex flex-col rounded-xl border border-black p-4 transition duration-500 hover:scale-105">
      <div>카테고리</div>
      <div>등록일</div>
      <div>마감일</div>
      <div>제목</div>
      <div>영법</div>
      <div className="my-2 border border-red-500" />
      <div className="flex gap-4">
        <div className="flex-1">작성자</div>
        <div>조회수</div>
        <div>댓글</div>
      </div>
    </div>
  );
}
