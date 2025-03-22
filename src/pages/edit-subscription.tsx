'use client';

import { Subscription } from '@/db/schema';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubscriptionForm } from '../components/subscription-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
// import { getSubscriptionById } from '../lib/db/queries';

export function EditSubscriptionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubscription() {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        // const data = await getSubscriptionById(id);
        const data: Subscription = {
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
        };
        if (!data) {
          setError('Subscription not found');
          return;
        }
        setSubscription(data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Failed to load subscription');
      } finally {
        setLoading(false);
      }
    }

    loadSubscription();
  }, [id, navigate]);

  if (loading) {
    return <div className="py-10">Loading subscription...</div>;
  }

  if (error) {
    return <div className="py-10 text-red-500">{error}</div>;
  }

  if (!subscription) {
    return <div className="py-10">Subscription not found</div>;
  }

  return (
    <div className="py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>Update your subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionForm subscription={subscription} />
        </CardContent>
      </Card>
    </div>
  );
}
