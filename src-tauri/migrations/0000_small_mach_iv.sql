CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`payment_method` text NOT NULL,
	`category` text NOT NULL,
	`notes` text,
	`payment_day` integer,
	`payment_month` integer,
	`payment_year` integer,
	`payment_week` integer,
	`payment_frequency` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL
);
