import { get, set, del, entries } from 'idb-keyval';

export interface Property {
  id: string;
  address: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

export interface Visitor {
  id: string;
  propertyId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  hasAgent?: 'yes' | 'no' | 'not specified';
  offMarketInterest?: 'yes' | 'no' | 'not specified';
  comments?: string;
  timestamp: string;
}

const DB_PREFIX = 'openhouse_';

export const db = {
  // Property methods
  async addProperty(property: Omit<Property, 'id'>): Promise<Property> {
    const id = `property_${Date.now()}`;
    const newProperty = { ...property, id };
    await set(`${DB_PREFIX}${id}`, newProperty);
    return newProperty;
  },

  async getProperties(): Promise<Property[]> {
    const allEntries = await entries();
    return allEntries
      .filter(([key]) => key.toString().startsWith(`${DB_PREFIX}property_`))
      .map(([_, value]) => value as Property)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getProperty(id: string): Promise<Property | null> {
    return (await get(`${DB_PREFIX}${id}`)) as Property | null;
  },
  
  async deleteProperty(id: string): Promise<void> {
    // First delete all visitors associated with this property
    const visitors = await this.getVisitors(id);
    for (const visitor of visitors) {
      await this.deleteVisitor(visitor.id);
    }
    // Then delete the property
    await del(`${DB_PREFIX}${id}`);
  },

  // Visitor methods
  async addVisitor(visitor: Omit<Visitor, 'id'>): Promise<Visitor> {
    const id = `visitor_${Date.now()}`;
    const newVisitor = { ...visitor, id };
    await set(`${DB_PREFIX}${id}`, newVisitor);
    return newVisitor;
  },

  async getVisitors(propertyId: string): Promise<Visitor[]> {
    const allEntries = await entries();
    return allEntries
      .filter(([key]) => key.toString().startsWith(`${DB_PREFIX}visitor_`))
      .map(([_, value]) => value as Visitor)
      .filter(visitor => visitor.propertyId === propertyId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  },
  
  async deleteVisitor(id: string): Promise<void> {
    await del(`${DB_PREFIX}${id}`);
  },

  async exportPropertyData(propertyId: string): Promise<string> {
    const property = await this.getProperty(propertyId);
    const visitors = await this.getVisitors(propertyId);
    
    const headers = ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Has Agent', 'Interest in Off-Market', 'Comments'];
    const rows = visitors.map(visitor => [
      visitor.timestamp,
      visitor.firstName,
      visitor.lastName,
      visitor.email || '',
      visitor.phone || '',
      visitor.hasAgent || 'not specified',
      visitor.offMarketInterest || 'not specified',
      visitor.comments || ''
    ].map(field => `"${field}"`).join(','));

    return [headers.join(','), ...rows].join('\n');
  }
}; 