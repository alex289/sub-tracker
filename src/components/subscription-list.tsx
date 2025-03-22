'use client';

import { Subscription } from '@/db/schema';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Switch } from './ui/switch';

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

export function SubscriptionList({
  subscriptions: initialSubscriptions,
}: SubscriptionListProps) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleToggleStatus = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, [id]: true }));
    try {
      // const updatedSubscription = await toggleSubscriptionStatus(id);
      // if (updatedSubscription) {
      //   setSubscriptions(
      //     subscriptions.map((sub) =>
      //       sub.id === id ? { ...sub, isActive: !sub.isActive } : sub,
      //     ),
      //   );
      // }
    } catch (error) {
      console.error('Error toggling subscription status:', error);
      alert('Failed to update subscription status');
    } finally {
      setIsLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      setIsLoading((prev) => ({ ...prev, [id]: true }));
      try {
        // await deleteSubscription(id);
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
      } catch (error) {
        console.error('Error deleting subscription:', error);
        alert('Failed to delete subscription');
      } finally {
        setIsLoading((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const formatCurrency = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getPaymentScheduleText = (sub: Subscription) => {
    switch (sub.paymentFrequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return `Weekly (Week ${sub.paymentWeek})`;
      case 'monthly':
        return `Monthly (Day ${sub.paymentDay})`;
      case 'yearly':
        return `Yearly (${sub.paymentMonth}/${sub.paymentDay})`;
      default:
        return 'Unknown schedule';
    }
  };

  if (subscriptions.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No subscriptions yet</h3>
        <p className="text-muted-foreground mt-2">
          Add your first subscription to get started
        </p>
        <Link to="/add" className="mt-4 inline-block">
          <Button>Add Subscription</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {subscriptions.map((subscription) => (
        <Card
          key={subscription.id}
          className={subscription.isActive ? '' : 'opacity-70'}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{subscription.name}</CardTitle>
                <CardDescription>{subscription.category}</CardDescription>
              </div>
              <Badge variant={subscription.isActive ? 'default' : 'outline'}>
                {subscription.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">
                  {formatCurrency(subscription.price, subscription.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{subscription.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing:</span>
                <span>{getPaymentScheduleText(subscription)}</span>
              </div>
              {subscription.notes && (
                <div className="mt-2">
                  <span className="text-muted-foreground">Notes:</span>
                  <p className="mt-1 text-sm">{subscription.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={subscription.isActive}
                onCheckedChange={() => handleToggleStatus(subscription.id)}
                disabled={isLoading[subscription.id]}
                aria-label="Toggle active status"
              />
              <span className="text-muted-foreground text-sm">
                {subscription.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                disabled={isLoading[subscription.id]}>
                <Link to={`/edit/${subscription.id}`}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(subscription.id)}
                disabled={isLoading[subscription.id]}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
