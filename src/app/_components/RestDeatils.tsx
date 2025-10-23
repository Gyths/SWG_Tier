'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestDetailsProps {
  id: string;
  name: string;
  imageUrl: string;
  grade: number;
  gradeDate: string;
}

export function RestDetails({ id, name, imageUrl, grade, gradeDate }: RestDetailsProps) {
  const router = useRouter();

  return (
    <div
      className="rounded-lg cursor-pointer p-3 flex flex-col items-center transition-all w-full max-w-md md:max-w-2xl"
      onClick={() => router.push(`/restaurant/${id}`)}
    >
      <Image 
        src={imageUrl} 
        alt={name} 
        width={400} 
        height={400} 
        className="rounded-md object-cover" 
      />
      <h3 className="mt-4 text-3xl font-bold text-black text-center">{name}</h3>
      <div className="mt-4 w-25 h-25 rounded-full bg-[#63A181] flex items-center justify-center text-white font-regular text-5xl ">
        {grade.toFixed(1)}
      </div>
      <p className="mt-2 text-1xl text-gray-700">{'Última evaluación: ' + new Date(gradeDate).toLocaleDateString()}</p>
    </div>
  );
}
