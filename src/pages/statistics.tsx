import { getActiveSubscriptions } from '@/db/queries';
import { Subscription } from '@/db/schema';
import { useEffect, useState } from 'react';
import { StatisticsDisplay } from '../components/statistics-display';

export function StatisticsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        const data = await getActiveSubscriptions();

        setSubscriptions(data);
      } catch (err) {
        console.error('Error fetching active subscriptions:', err);
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
    return <div className="py-10">Loading statistics...</div>;
  }

  if (error) {
    return <div className="py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <h1 className="mb-8 text-3xl font-bold">Statistics</h1>
      <StatisticsDisplay subscriptions={subscriptions} />
    </div>
  );
}
