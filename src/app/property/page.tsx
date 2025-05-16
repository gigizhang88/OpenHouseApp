'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HomeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { db, type Property, type Visitor } from '@/lib/db';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasAgent: 'yes' | 'no' | 'not specified';
  offMarketInterest: 'yes' | 'no' | 'not specified';
  comments: string;
};

function PropertyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [property, setProperty] = useState<Property | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hasAgent: 'not specified',
    offMarketInterest: 'not specified',
    comments: ''
  });

  useEffect(() => {
    if (id) {
      loadProperty();
      loadVisitors();
    }
  }, [id]);

  async function loadProperty() {
    if (id) {
      const prop = await db.getProperty(id);
      setProperty(prop);
    }
  }

  async function loadVisitors() {
    if (id) {
      const visitorList = await db.getVisitors(id);
      setVisitors(visitorList);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await db.addVisitor({
        ...formData,
        propertyId: id,
        timestamp: new Date().toISOString()
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        hasAgent: 'not specified',
        offMarketInterest: 'not specified',
        comments: ''
      });
      loadVisitors();
    }
  };

  const handleExport = async () => {
    if (id) {
      const csv = await db.exportPropertyData(id);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Format the filename using the id instead of property info
      const safeAddress = id.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const date = new Date().toISOString().split('T')[0];
      a.download = `open-house-${safeAddress}-${date}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  
  const handleDeleteVisitor = async (visitorId: string) => {
    if (confirm('Are you sure you want to delete this visitor?')) {
      await db.deleteVisitor(visitorId);
      loadVisitors();
    }
  };
  
  const handleDeleteProperty = async () => {
    if (id && confirm('Are you sure you want to delete this property and all its visitors?')) {
      await db.deleteProperty(id);
      router.push('/');
    }
  };

  if (!property) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.address}</h1>
          <p className="text-gray-600">
            {new Date(property.date).toLocaleDateString()} - {property.timeSlot}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/')}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </button>
          <button
            onClick={handleDeleteProperty}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            Delete Property
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Are you working with a real estate agent?
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.hasAgent}
                onChange={(e) => setFormData(prev => ({ ...prev, hasAgent: e.target.value as FormData['hasAgent'] }))}
              >
                <option value="not specified">Not Specified</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interested in off-market properties?
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.offMarketInterest}
                onChange={(e) => setFormData(prev => ({ ...prev, offMarketInterest: e.target.value as FormData['offMarketInterest'] }))}
              >
                <option value="not specified">Not Specified</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <textarea
                id="comments"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Sign In
            </button>
          </form>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Visitors</h2>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export CSV
            </button>
          </div>

          <div className="space-y-4">
            {visitors.map((visitor) => (
              <div key={visitor.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {visitor.firstName} {visitor.lastName}
                    </h3>
                    {visitor.email && <p className="text-sm text-gray-600">{visitor.email}</p>}
                    {visitor.phone && <p className="text-sm text-gray-600">{visitor.phone}</p>}
                    {visitor.comments && (
                      <p className="text-sm text-gray-600 mt-2">{visitor.comments}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleDeleteVisitor(visitor.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete visitor"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {visitors.length === 0 && (
              <div className="text-center py-6 bg-white rounded-lg shadow">
                <p className="text-gray-500">No visitors have signed in yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PropertyPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <PropertyContent />
    </Suspense>
  );
} 