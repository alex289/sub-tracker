'use client';

import { Subscription } from '@/db/schema';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SubscriptionList } from '../components/subscription-list';
import { Button } from '../components/ui/button';

export function HomePage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        // const data = await getSubscriptions();
        const data = [
          {
            id: '1',
            name: 'Test Subscription',
            price: 10,
            currency: 'USD',
            paymentMethod: 'Credit Card',
            category: 'Entertainment',
            notes: 'Test notes',
            paymentFrequency: 'monthly',
            paymentDay: 1,
            isActive: true,
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            paymentMonth: 1,
            paymentYear: 2023,
            paymentWeek: 1,
          },
        ];
        setSubscriptions(data);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError(
          'Failed to load subscriptions. Make sure the database is properly initialized.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubscriptions();
  }, []);

  if (loading) {
    return <div className="py-10">Loading subscriptions...</div>;
  }

  if (error) {
    return <div className="py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Link to="/add">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Subscription
          </Button>
        </Link>
      </div>

      <SubscriptionList subscriptions={subscriptions} />
    </div>
  );
}
