'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '@heroicons/react/24/outline';
import { db } from '@/lib/db';

export default function NewProperty() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    address: '',
    date: '',
    timeSlot: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const property = await db.addProperty({
      ...formData,
      createdAt: new Date().toISOString()
    });
    router.push(`/property?id=${property.id}`);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
        <button
          onClick={() => router.push('/')}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Home
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Property Address
          </label>
          <input
            type="text"
            id="address"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Open House Date
          </label>
          <input
            type="date"
            id="date"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
            Time Slot
          </label>
          <input
            type="text"
            id="timeSlot"
            required
            placeholder="e.g., 2:00 PM - 4:00 PM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.timeSlot}
            onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Property
          </button>
        </div>
      </form>
    </main>
  );
} 