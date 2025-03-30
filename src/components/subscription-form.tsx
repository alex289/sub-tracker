import { createSubscription, updateSubscription } from '@/db/queries';
import { Subscription } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().positive('Price must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  category: z.string().min(1, 'Category is required'),
  notes: z.string().optional(),
  paymentFrequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  paymentDay: z.coerce.number().min(1).max(31).optional(),
  paymentMonth: z.coerce.number().min(1).max(12).optional(),
  paymentWeek: z.coerce.number().min(1).max(52).optional(),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface SubscriptionFormProps {
  subscription?: Subscription;
}

export function SubscriptionForm({ subscription }: SubscriptionFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<FormValues> = subscription
    ? {
        name: subscription.name,
        price: subscription.price,
        currency: subscription.currency,
        paymentMethod: subscription.paymentMethod,
        category: subscription.category,
        notes: subscription.notes || '',
        paymentFrequency: subscription.paymentFrequency as
          | 'daily'
          | 'weekly'
          | 'monthly'
          | 'yearly',
        paymentDay: subscription.paymentDay || undefined,
        paymentMonth: subscription.paymentMonth || undefined,
        paymentWeek: subscription.paymentWeek || undefined,
        isActive: subscription.isActive,
      }
    : {
        name: '',
        price: 0,
        currency: 'USD',
        paymentMethod: '',
        category: '',
        notes: '',
        paymentFrequency: 'monthly',
        paymentDay: 1,
        isActive: true,
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const paymentFrequency = form.watch('paymentFrequency');

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      if (subscription) {
        await updateSubscription(subscription.id, values);
      } else {
        await createSubscription(values);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' },
    { value: 'CAD', label: 'CAD ($)' },
    { value: 'AUD', label: 'AUD ($)' },
  ];

  const paymentMethods = [
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Bank Transfer',
    'Apple Pay',
    'Google Pay',
    'Cash',
    'Other',
  ];

  const categories = [
    'Entertainment',
    'Streaming',
    'Software',
    'Utilities',
    'Food & Drink',
    'Health & Fitness',
    'Shopping',
    'Education',
    'Gaming',
    'Other',
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Netflix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="paymentFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentFrequency === 'monthly' && (
          <FormField
            control={form.control}
            name="paymentDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Day</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="31" {...field} />
                </FormControl>
                <FormDescription>Day of the month (1-31)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {paymentFrequency === 'yearly' && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="paymentMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Month</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="12" {...field} />
                  </FormControl>
                  <FormDescription>Month (1-12)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Day</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="31" {...field} />
                  </FormControl>
                  <FormDescription>Day (1-31)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {paymentFrequency === 'weekly' && (
          <FormField
            control={form.control}
            name="paymentWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Week</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="52" {...field} />
                </FormControl>
                <FormDescription>Week of the year (1-52)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional information..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>
                  Is this subscription currently active?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : subscription ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
