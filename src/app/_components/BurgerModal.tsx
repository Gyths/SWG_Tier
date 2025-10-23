'use client';
import { useState } from 'react';
import { api } from '~/trpc/react';

interface BurgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  onBurgerCreated: () => void;
}

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function BurgerModal({ isOpen, onClose, restaurantId, onBurgerCreated }: BurgerModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const createBurger = api.burger.create.useMutation({
    onSuccess: () => {
      console.log('✅ Burger created successfully');
      onBurgerCreated();
      onClose();
      setName('');
      setDescription('');
      setImage(null);
    },
    onError: (err) => {
      console.error('❌ Failed to create burger:', err);
      alert(`Error: ${err.message}`);
    },
  });

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert('Please enter a name for the burger');

    let imageUrl: string | undefined = undefined;

    if (image) {
      try {
        imageUrl = await getBase64(image);
      } catch (err) {
        console.error('Failed to convert image:', err);
        return;
      }
    }

    createBurger.mutate({
      restaurantId,
      name,
      description,
      image: imageUrl,
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
        <h3 className="text-2xl font-bold mb-4">Agrega una hamburguesa</h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold mb-1 text-gray-800">Nombre*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='ej. El batan del abuelo'
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1 text-gray-800">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"ej. Ingredientes, preparación, tipo de carne"}
              className="w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
            />
          </div>
          
          <div className="w-full">
            <label className="block text-lg font-semibold mb-2 text-gray-800 text-center">
              Imagen de la hamburguesa
            </label>
            
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-[#429B99] bg-[#429B99]/10' 
                  : 'border-gray-300 hover:border-[#429B99] hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {image ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Arrastra una imagen aquí
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    o haz clic para seleccionar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#833F57] text-white px-8 py-2 rounded-lg hover:bg-[#B5416A] transition disabled:opacity-100"
            disabled={createBurger.isLoading || !name.trim()}
          >
            {createBurger.isLoading ? 'Cocinando...' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}