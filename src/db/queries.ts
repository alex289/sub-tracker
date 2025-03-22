// import { eq } from 'drizzle-orm';
// import { v4 as uuidv4 } from 'uuid';
// import { db } from './database';
// import type { NewSubscription, Subscription } from './schema';
// import { subscriptions } from './schema';

// // Get all subscriptions
// export async function getSubscriptions() {
//   return db.select().from(subscriptions).all();
// }

// // Get active subscriptions
// export async function getActiveSubscriptions() {
//   return db
//     .select()
//     .from(subscriptions)
//     .where(eq(subscriptions.isActive, true))
//     .all();
// }

// // Get subscription by ID
// export async function getSubscriptionById(id: string) {
//   const result = db
//     .select()
//     .from(subscriptions)
//     .where(eq(subscriptions.id, id))
//     .get();
//   return result || undefined;
// }

// // Create a new subscription
// export async function createSubscription(
//   data: NewSubscription,
// ): Promise<Subscription> {
//   const now = new Date().toISOString();

//   const newSubscription: Subscription = {
//     ...data,
//     id: uuidv4(),
//     createdAt: now,
//     updatedAt: now,
//   };

//   db.insert(subscriptions)
//     .values({
//       id: newSubscription.id,
//       name: newSubscription.name,
//       price: newSubscription.price,
//       currency: newSubscription.currency,
//       paymentMethod: newSubscription.paymentMethod,
//       category: newSubscription.category,
//       notes: newSubscription.notes,
//       paymentDay: newSubscription.paymentDay,
//       paymentMonth: newSubscription.paymentMonth,
//       paymentYear: newSubscription.paymentYear,
//       paymentWeek: newSubscription.paymentWeek,
//       paymentFrequency: newSubscription.paymentFrequency,
//       isActive: newSubscription.isActive,
//       createdAt: newSubscription.createdAt,
//       updatedAt: newSubscription.updatedAt,
//     })
//     .run();

//   return newSubscription;
// }

// // Update a subscription
// export async function updateSubscription(
//   id: string,
//   data: Partial<NewSubscription>,
// ) {
//   const subscription = await getSubscriptionById(id);

//   if (!subscription) {
//     return undefined;
//   }

//   const now = new Date().toISOString();

//   const updatedSubscription = {
//     ...subscription,
//     ...data,
//     updatedAt: now,
//   };

//   db.update(subscriptions)
//     .set({
//       name: updatedSubscription.name,
//       price: updatedSubscription.price,
//       currency: updatedSubscription.currency,
//       paymentMethod: updatedSubscription.paymentMethod,
//       category: updatedSubscription.category,
//       notes: updatedSubscription.notes,
//       paymentDay: updatedSubscription.paymentDay,
//       paymentMonth: updatedSubscription.paymentMonth,
//       paymentYear: updatedSubscription.paymentYear,
//       paymentWeek: updatedSubscription.paymentWeek,
//       paymentFrequency: updatedSubscription.paymentFrequency,
//       isActive: updatedSubscription.isActive,
//       updatedAt: updatedSubscription.updatedAt,
//     })
//     .where(eq(subscriptions.id, id))
//     .run();

//   return updatedSubscription;
// }

// // Delete a subscription
// export async function deleteSubscription(id: string): Promise<void> {
//   db.delete(subscriptions).where(eq(subscriptions.id, id)).run();
// }

// // Toggle subscription active status
// export async function toggleSubscriptionStatus(id: string) {
//   const subscription = await getSubscriptionById(id);

//   if (!subscription) {
//     return undefined;
//   }

//   const now = new Date().toISOString();

//   const updatedSubscription = {
//     ...subscription,
//     isActive: !subscription.isActive,
//     updatedAt: now,
//   };

//   db.update(subscriptions)
//     .set({
//       isActive: updatedSubscription.isActive,
//       updatedAt: updatedSubscription.updatedAt,
//     })
//     .where(eq(subscriptions.id, id))
//     .run();

//   return updatedSubscription;
// }
