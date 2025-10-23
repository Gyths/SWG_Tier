'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import RestaurantCard from './_components/RestaurantCard';
import AddRestaurantCard from './_components/AddRestCard';
import RestaurantModal from './_components/RestaurantModal';

const gradeDivisions = [
  { label: 'S+', min: 10, max: 10 },
  { label: 'S', min: 8, max: 9.9 },
  { label: 'A', min: 6, max: 7.9 },
  { label: 'B', min: 4, max: 5.9 },
  { label: 'C', min: 2, max: 3.9 },
  { label: 'D', min: 0.1, max: 1.9 },
  { label: 'F', min: 0, max: 0 },
];

const filterOptions = [
  { label: 'Todos', id: 'all' },
  { label: 'Favoritos', id: 'favorites' },
  { label: 'Recientes', id: 'recent' },
  { label: 'Por visitar', id: 'to-visit' },
  { label: 'Vegetariano', id: 'vegetarian' },
];

export default function HomePage() {
  const { data: restaurants } = api.restaurant.list.useQuery();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleCardClick = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  const handleAddRestaurant = (data: any) => {
    console.log('New restaurant:', data);
    // TODO: send data to backend via TRPC mutation
  };

  return (
    <div className="p-4 bg-[#F5F3EF] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-5xl font-light">Restaurantes Visitados</h1>
          <AddRestaurantCard
            onClick={() => setIsModalOpen(true)}
            size={60}
            fontSize={42}
          />
        </div>

        {/* Filters Section */}
        <div className="mt-6 flex items-center gap-4">
          <h3 className="text-lg font-medium text-gray-700">Filtros</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#429B99] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Sections by Grade */}
      {gradeDivisions.map((grade) => {
        const filtered = restaurants?.filter(
          (r) => r.grade >= grade.min && r.grade <= grade.max
        );

        if (!filtered || filtered.length === 0) return null;

        return (
          <div key={grade.label} className="mb-6">
            <div className="mb-2">
              <h2 className="text-xl font-bold">{grade.label}</h2>
              <div className="border-b-2 border-gray-400 w-10 mt-1"></div>
            </div>
            <div className="flex items-center overflow-x-auto gap-4 py-2">
              {filtered.map((r) => (
                <RestaurantCard
                  key={r.id}
                  name={r.name ?? ''}
                  image={r.image}
                  onClick={() => handleCardClick(r.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <RestaurantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRestaurant}
      />
    </div>
  );
}