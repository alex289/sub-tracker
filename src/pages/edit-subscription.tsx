'use client';

import { getSubscriptionById } from '@/db/queries';
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
        const data = await getSubscriptionById(id);

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
