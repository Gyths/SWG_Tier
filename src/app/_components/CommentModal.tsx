// app/_components/CommentModal.tsx
'use client';
import { useState } from 'react';
import { api } from '~/trpc/react';
import { useAuth } from '../context/AuthContext';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  burgerId: string;
  onCommentAdded: () => void;
}

export default function CommentModal({ isOpen, onClose, burgerId, onCommentAdded }: CommentModalProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [grade, setGrade] = useState<number>(5);
  const [priceAlone, setPriceAlone] = useState<string>('');
  const [priceMeal, setPriceMeal] = useState<string>('');
  const [priceDiscount, setPriceDiscount] = useState<string>('');

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      console.log('✅ Comentario creado');
      onCommentAdded();
      onClose();
      // Reset form
      setContent('');
      setGrade(5);
      setPriceAlone('');
      setPriceMeal('');
      setPriceDiscount('');
    },
    onError: (err) => {
      console.error('❌ Error al crear comentario:', err);
      alert(`Error: ${err.message}`);
    },
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!user) {
      alert('Debes estar logueado para comentar');
      return;
    }

    if (!content.trim()) {
      alert('Escribe un comentario');
      return;
    }

    createComment.mutate({
      burgerId,
      userId: user.id,
      content,
      grade,
      priceAlone: priceAlone ? parseFloat(priceAlone) : undefined,
      priceMeal: priceMeal ? parseFloat(priceMeal) : undefined,
      priceDiscount: priceDiscount ? parseFloat(priceDiscount) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#F5F3EF] rounded-xl shadow-lg p-8 w-[90%] max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 text-2xl hover:text-black"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4">Agregar Calificación</h3>

        <div className="flex flex-col gap-4">
          {/* Comment */}
          <div>
            <label className="block text-lg font-semibold mb-1 text-gray-800">Comentario*</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="¿Qué te pareció?"
              className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block text-lg font-semibold mb-1 text-gray-800">
              Calificación: {grade.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={grade}
              onChange={(e) => setGrade(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>0</span>
              <span>10</span>
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800">Precio Solo</label>
              <input
                type="number"
                step="0.01"
                value={priceAlone}
                onChange={(e) => setPriceAlone(e.target.value)}
                placeholder="S/. 0.00"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800">Precio Combo</label>
              <input
                type="number"
                step="0.01"
                value={priceMeal}
                onChange={(e) => setPriceMeal(e.target.value)}
                placeholder="S/. 0.00"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800">Precio Promo</label>
              <input
                type="number"
                step="0.01"
                value={priceDiscount}
                onChange={(e) => setPriceDiscount(e.target.value)}
                placeholder="S/. 0.00"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#833F57] text-white px-8 py-2 rounded-lg hover:bg-[#B5416A] transition disabled:opacity-50"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? 'Guardando...' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}