'use client';
import React, { useState } from 'react';
import { usePathname} from 'next/navigation';
import { api } from '~/trpc/react';
import { RestDetails } from "../../_components/RestDeatils";
import { BurgerDetails } from "../../_components/BurgerDetails";
import { NoteCard } from "../../_components/NotesCard";
import AddRestaurantCard from "../../_components/AddRestCard";
import BurgerModal from "../../_components/BurgerModal";
import Link from 'next/link';


export default function RestaurantPage() {
  const pathname = usePathname();
  // Extract ID from the path, e.g., /restaurant/[id]
  const id = pathname.split('/').pop() ?? ''; 
  
  const [isBurgerModalOpen, setIsBurgerModalOpen] = useState(false);

  // Fetch the restaurant and its burgers
  const { data: restaurant, isLoading, error, refetch } = api.restaurant.getById.useQuery({ id });
  
  // Handle Loading/Error states
  if (isLoading) return <div className="p-4 text-center">Cortando las verduras...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error al cargar datos: {error.message}</div>;
  if (!restaurant) return <div className="p-4 text-center">Restaurante no encontrado.</div>;

  // Since we are loading the restaurant, the data access should be safe
  const burgers = restaurant.burgers || [];

  return (
    <div className="p-4 bg-[#F5F3EF] min-h-screen">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Left Column: Restaurant Card */}
        <div className="flex flex-col gap-4 flex-1 max-w-2xl mx-auto">
          <RestDetails
            id={restaurant.id}
            name={restaurant.name ?? 'Unnamed Restaurant'}
            // Use the image from DB (Base64 or URL). Provide a fallback if needed.
            imageUrl={restaurant.image ?? '/images/default-rest.jpg'} 
            grade={restaurant.grade ?? 0}
            // Optional: Format the gradeDate if needed, otherwise use it directly
            gradeDate={restaurant.gradeDate?.toISOString().split('T')[0] ?? 'N/A'} 
          />
        </div>

        {/* Middle Column: Menu */}
        <div className="flex flex-col gap-4 flex-1 max-w-2xl mx-auto">
          <div className="flex items-center mb-2">
            <h2 className="text-5xl font-light">Carta Probada:</h2>
            <AddRestaurantCard
              onClick={() => setIsBurgerModalOpen(true)} // Open modal on click
              size={50}
              fontSize={36}
              className="ml-5"
            />
          </div>

          <div className="flex flex-col gap-5">
            {burgers.length > 0 ? (
              burgers.map((b) => (
                <Link 
                    key={b.id} 
                    href={`/restaurant/${restaurant.id}/burger/${b.id}`} 
                    // ✅ Agregado mr-4 para margen a la derecha
                    className="block max-w-xl mr-4"
                >
                  <BurgerDetails
                    name={b.name ?? 'Unnamed Burger'}
                    description={b.description ?? 'No description provided.'}
                    imageUrl={b.image ?? '/images/default-burger.jpg'}
                    grade={b.grade ?? 0}
                    id={b.id}
                    restaurantId={restaurant.id}
                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">Pan con soledad por aqui.</p>
            )}
          </div>
        </div>

        {/* Right Column: Notes */}
        <div className="flex flex-col gap-4 flex-1 max-w-2xl mx-auto mt-8 md:mt-18">
          <NoteCard notes={restaurant.notes ?? 'No notes available for this restaurant.'} />
          {/* NOTE: If you also want the NoteCard to be left-aligned and constrained, 
                     you'd apply max-w-xl and mr-auto to the NoteCard component or its wrapper. */}
        </div>
      </div>
      
      {/* Burger Modal */}
      <BurgerModal
        isOpen={isBurgerModalOpen}
        onClose={() => setIsBurgerModalOpen(false)}
        restaurantId={restaurant.id}
        onBurgerCreated={refetch} // Refetch data when a burger is created
      />
    </div>
  );
}