'use client';
import Image from 'next/image';

interface Props {
  name: string;
  imageUrl: string;
  description: string;
  gradeDate: string;
}

export function BurgerDetailsCard({ name, imageUrl, description, gradeDate }: Props) {
  return (
    <div className="flex flex-col items-center  rounded-lg p-4 w-full max-w-md mx-auto">
      <Image src={imageUrl} alt={name} width={450} height={450} className="rounded-md object-cover" />
      <h3 className="mt-6 text-5xl font-bold text-black text-center">{name}</h3>
      <p className="mt-6 text-black text-center">{description}</p>
      <p className="mt-6 text-xl text-gray-700">{"Fecha de calificacion: "+ new Date(gradeDate).toLocaleDateString()}</p>
    </div>
  );
}
