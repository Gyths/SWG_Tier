'use client';
interface PriceOption {
  label: string; // e.g., "Meal", "Discount"
  price: number;
}

interface Props {
  prices: PriceOption[];
}

export function PriceCard({ prices }: Props) {
  return (
    <div className="flex flex-col items-center rounded-lg p-4 w-full max-w-md mx-auto gap-8 sm:gap-30">
      {prices.map((p, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-25 h-25 rounded-full bg-[#833F57] text-white flex items-center justify-center font-semibold text-4xl">
            s/.{p.price}
          </div>
          <span className="text-black text-2xl mt-2">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
