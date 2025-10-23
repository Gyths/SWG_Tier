'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BurgerDetProps {
  id: string;           // unique burger id
  restaurantId: string; // parent restaurant id
  name: string;
  description: string;
  imageUrl: string;
  grade: number;
}

export function BurgerDetails({ id, restaurantId, name, description, imageUrl, grade }: BurgerDetProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/restaurant/${restaurantId}/burger/${id}`);
  };

  return (
    <div 
      className="bg-[#429B99] rounded-lg py-1.5 sm:py-2 pl-2 sm:pl-3 pr-2 sm:pr-8 flex items-center gap-2 sm:gap-3 max-w-lg cursor-pointer hover:brightness-105 transition shadow-lg"
      onClick={handleClick}
    >
      {/* Imagen responsive */}
      <Image
        src={imageUrl}
        alt={name}
        width={150}
        height={150}
        className="rounded-md flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover"
      />
      
      {/* Contenido de texto */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <h4 className="font-bold text-white text-sm sm:text-base md:text-lg truncate w-full block">{name}</h4>
        <p className="text-white text-xs sm:text-sm truncate w-full block whitespace-nowrap overflow-hidden text-ellipsis">{description}</p>
      </div>
      
      {/* Círculo de calificación responsive */}
      <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#493B31] flex items-center justify-center text-white font-regular text-lg sm:text-xl md:text-3xl flex-shrink-0">
        {grade.toFixed(1)}
      </div>
    </div>
  );
}