import { SubscriptionForm } from '../components/subscription-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export function AddSubscriptionPage() {
  return (
    <div className="py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Add Subscription</CardTitle>
          <CardDescription>
            Add a new subscription to track your expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionForm />
        </CardContent>
      </Card>
    </div>
  );
}
