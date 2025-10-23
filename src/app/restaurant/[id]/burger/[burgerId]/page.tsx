// /app/burger/[id]/page.tsx
'use client';
import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { useAuth } from '~/app/context/AuthContext';
import { BurgerDetailsCard } from '~/app/_components/BurgerDetailsCard';
import { CommentCard } from '~/app/_components/CommentCard';
import { PriceCard } from '~/app/_components/PriceCard';
import AddRestaurantCard from '~/app/_components/AddRestCard';
import CommentModal from '~/app/_components/CommentModal';

interface BurgerPageProps {
    params: Promise<{
        id: string;
        burgerId: string;
    }>;
}

export default function BurgerPage({ params }: BurgerPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.burgerId;
  const router = useRouter();
  const { user } = useAuth();
  
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // Fetch the burger and its comments
  const { data: burger, isLoading, error, refetch } = api.burger.getById.useQuery({ id });
  
  // Extract user IDs early (before any conditional returns)
  const userIds = burger?.comments ? [...new Set(burger.comments.map(c => c.userId))] : [];
  
  // Fetch all users in one query - ALWAYS call this hook
  const { data: users } = api.auth.getByIds.useQuery(
    { ids: userIds },
    { enabled: userIds.length > 0 }
  );

  // Handle Loading/Error states AFTER all hooks are called
  if (isLoading) return <div className="p-4 text-center bg-[#F5F3EF] min-h-screen">Agregando especias...</div>;
  if (error) return <div className="p-4 text-center text-red-600 bg-[#F5F3EF] min-h-screen">Error al cargar datos: {error.message}</div>;
  if (!burger) return <div className="p-4 text-center bg-[#F5F3EF] min-h-screen">Oh No! Un Veneco se robó la hamburguesa :O.</div>;
  
  // Calculate average grade and assemble prices from all comments
  const validGrades = burger.comments.map(c => c.grade).filter((g): g is number => g !== null && g !== undefined);
  const averageGrade = validGrades.length > 0 
    ? (validGrades.reduce((sum, g) => sum + g, 0) / validGrades.length) 
    : (burger.grade ?? 0);
    
  
  const prevailingPrices = [];
  if (burger.priceAlone) {
    prevailingPrices.push({ label: 'Solo', price: burger.priceAlone });
  }
  if (burger.priceMeal) {
    prevailingPrices.push({ label: 'Combo', price: burger.priceMeal });
  }
  if (burger.priceDiscount) {
    prevailingPrices.push({ label: 'Promo', price: burger.priceDiscount });
  }

  // Create a map of userId to username
  const userMap = new Map();
  users?.forEach(u => {
    userMap.set(u.id, u.name ?? u.email ?? 'Usuario');
  });

  const handleAddCommentClick = () => {
    if (!user) {
      // Redirect to login if not logged in
      router.push('/login');
      return;
    }
    setIsCommentModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#F5F3EF] min-h-screen">
      {/* Left Column: Burger Details */}
      <div className="flex flex-col gap-4 flex-2">
        <BurgerDetailsCard
          name={burger.name ?? 'Unnamed Burger'}
          imageUrl={burger.image ?? '/images/default-burger.jpg'}
          description={burger.description ?? 'No description available.'}
          gradeDate={burger.gradeDate?.toISOString().split('T')[0] ?? 'N/A'}
        />
      </div>

      {/* Middle Column: Comments + Final Grade */}
      <div className="flex flex-col gap-20 flex-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="text-5xl font-light">Calificación Final:</h2>
            {/* Display the calculated average grade */}
            <div className="w-20 h-20 rounded-full bg-[#493B31] flex items-center justify-center text-white font-regular text-3xl flex-shrink-0">
                {averageGrade.toFixed(1)}
            </div>
            <AddRestaurantCard onClick={handleAddCommentClick} size={50} fontSize={36} />
        </div>
        
        <div className="flex flex-col gap-3">
          {burger.comments.length > 0 ? (
            burger.comments.map((c) => (
              <CommentCard 
                key={c.id}
                username={userMap.get(c.userId) ?? 'Cargando...'} 
                comment={c.content} 
                grade={c.grade ?? 'N/A'} 
              />
            ))
          ) : (
            <p className="text-gray-500">Aun no hay calificaciones para esta hamburguesa</p>
          )}
        </div>
      </div>

      {/* Right Column: Prices */}
      <div className="flex flex-col gap-4 flex-1">
        <PriceCard prices={prevailingPrices} /> 
      </div>
      
      {/* Comment Modal */}
      {user && (
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
          burgerId={burger.id}
          onCommentAdded={refetch}
        />
      )}
    </div>
  );
}