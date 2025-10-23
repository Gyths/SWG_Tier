'use client';
interface Props {
  username: string;
  comment: string;
  grade: number;
}

export function CommentCard({ username, comment, grade }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4 rounded-lg p-4 w-full max-w-5xl mx-auto">
      {/* Username */}
      <div className="flex-shrink-0 text-black font-semibold text-2xl md:w-32">{username}</div>

      {/* Grade Circle */}
      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#63A181] flex items-center justify-center text-white font-regular text-3xl">
        {grade.toFixed(1)}
      </div>

      {/* Comment Text */}
      <p className="text-black flex-1 break-words">{comment}</p>
    </div>
  );
}
