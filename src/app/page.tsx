'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { db, type Property } from '@/lib/db';
import { getPathWithTrailingSlash, createPropertyLink } from '@/lib/navigation';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    const props = await db.getProperties();
    setProperties(props);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Open House Manager</h1>
        <Link
          href={getPathWithTrailingSlash('/property/new')}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={createPropertyLink(property.id)}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{property.address}</h2>
            <p className="text-gray-600">
              Date: {new Date(property.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Time: {property.timeSlot}</p>
          </Link>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties added yet.</p>
          <p className="text-gray-500">Click &quot;Add New Property&quot; to get started.</p>
        </div>
      )}
    </main>
  );
} 