'use client';

import { Subscription } from '@/db/schema';
import { useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface StatisticsDisplayProps {
  subscriptions: Subscription[];
}

export function StatisticsDisplay({ subscriptions }: StatisticsDisplayProps) {
  const [currency, setCurrency] = useState('USD');

  // Calculate statistics
  const totalSubscriptions = subscriptions.length;

  const monthlyCost = subscriptions.reduce((total, sub) => {
    if (sub.currency !== currency) {
      return total;
    }

    switch (sub.paymentFrequency) {
      case 'daily':
        return total + sub.price * 30;
      case 'weekly':
        return total + sub.price * 4.33;
      case 'monthly':
        return total + sub.price;
      case 'yearly':
        return total + sub.price / 12;
      default:
        return total;
    }
  }, 0);

  const yearlyCost = monthlyCost * 12;

  const averageMonthlyCost =
    totalSubscriptions > 0 ? monthlyCost / totalSubscriptions : 0;

  const mostExpensiveSubscription = subscriptions.reduce(
    (most, sub) => {
      if (sub.currency !== currency) {
        return most;
      }

      let normalizedPrice = sub.price;
      switch (sub.paymentFrequency) {
        case 'daily':
          normalizedPrice *= 30;
          break;
        case 'weekly':
          normalizedPrice *= 4.33;
          break;
        case 'yearly':
          normalizedPrice /= 12;
          break;
      }

      return normalizedPrice > (most?.normalizedPrice || 0)
        ? { ...sub, normalizedPrice }
        : most;
    },
    null as (Subscription & { normalizedPrice: number }) | null,
  );

  // Calculate this month's costs
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;

  const thisMonthCost = subscriptions.reduce((total, sub) => {
    if (sub.currency !== currency) {
      return total;
    }

    switch (sub.paymentFrequency) {
      case 'daily':
        return total + sub.price * 30;
      case 'weekly':
        return total + sub.price * 4.33;
      case 'monthly':
        if (sub.paymentDay && sub.paymentDay <= currentDay) {
          return total + sub.price;
        }
        return total;
      case 'yearly':
        if (
          sub.paymentMonth === currentMonth &&
          sub.paymentDay &&
          sub.paymentDay <= currentDay
        ) {
          return total + sub.price;
        }
        return total + sub.price / 12;
      default:
        return total;
    }
  }, 0);

  // Prepare data for category pie chart
  const categoryData = subscriptions.reduce(
    (acc, sub) => {
      if (sub.currency !== currency) {
        return acc;
      }

      let normalizedPrice = sub.price;
      switch (sub.paymentFrequency) {
        case 'daily':
          normalizedPrice *= 30;
          break;
        case 'weekly':
          normalizedPrice *= 4.33;
          break;
        case 'yearly':
          normalizedPrice /= 12;
          break;
      }

      const existingCategory = acc.find((item) => item.name === sub.category);
      if (existingCategory) {
        existingCategory.value += normalizedPrice;
      } else {
        acc.push({ name: sub.category, value: normalizedPrice });
      }
      return acc;
    },
    [] as { name: string; value: number }[],
  );

  // Prepare data for payment method pie chart
  const paymentMethodData = subscriptions.reduce(
    (acc, sub) => {
      if (sub.currency !== currency) {
        return acc;
      }

      let normalizedPrice = sub.price;
      switch (sub.paymentFrequency) {
        case 'daily':
          normalizedPrice *= 30;
          break;
        case 'weekly':
          normalizedPrice *= 4.33;
          break;
        case 'yearly':
          normalizedPrice /= 12;
          break;
      }

      const existingMethod = acc.find(
        (item) => item.name === sub.paymentMethod,
      );
      if (existingMethod) {
        existingMethod.value += normalizedPrice;
      } else {
        acc.push({ name: sub.paymentMethod, value: normalizedPrice });
      }
      return acc;
    },
    [] as { name: string; value: number }[],
  );

  // Colors for pie charts
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82CA9D',
    '#FCCDE5',
    '#8DD1E1',
    '#FFFFB3',
    '#FB8072',
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' },
    { value: 'CAD', label: 'CAD ($)' },
    { value: 'AUD', label: 'AUD ($)' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-end gap-2">
        <span className="text-muted-foreground text-sm">
          Display amounts in:
        </span>
        <Select onValueChange={(e) => setCurrency(e)} defaultValue={currency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {currencies.map((curr) => (
                <SelectItem key={curr.value} value={curr.value}>
                  {curr.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-muted-foreground ml-2 text-xs">
          (Only showing data for subscriptions in this currency)
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscriptions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(monthlyCost)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Yearly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(yearlyCost)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              This Month&apos;s Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(thisMonthCost)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average Monthly Cost</CardTitle>
            <CardDescription>Average cost per subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(averageMonthlyCost)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Expensive Subscription</CardTitle>
            <CardDescription>Your highest monthly expense</CardDescription>
          </CardHeader>
          <CardContent>
            {mostExpensiveSubscription ? (
              <div>
                <div className="text-3xl font-bold">
                  {formatCurrency(mostExpensiveSubscription.normalizedPrice)}
                </div>
                <div className="text-muted-foreground mt-1">
                  {mostExpensiveSubscription.name} (
                  {mostExpensiveSubscription.category})
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">
                No subscriptions found
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                Monthly cost distribution across categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }>
                      {categoryData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment-methods">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Payment Method</CardTitle>
              <CardDescription>
                Monthly cost distribution across payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {paymentMethodData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }>
                      {paymentMethodData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
