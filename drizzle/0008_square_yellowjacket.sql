CREATE TABLE `billingHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`subscriptionId` int NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`status` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
	`stripeInvoiceId` varchar(255),
	`invoiceUrl` varchar(500),
	`paidAt` timestamp,
	`failedAt` timestamp,
	`periodStart` timestamp NOT NULL,
	`periodEnd` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `billingHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referralCodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`code` varchar(50) NOT NULL,
	`referralLink` varchar(500) NOT NULL,
	`totalReferrals` int NOT NULL DEFAULT 0,
	`totalRewardsMonths` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referralCodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `referralCodes_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `referralTracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referralCode` varchar(50) NOT NULL,
	`newUserId` int NOT NULL,
	`rewardMonths` int NOT NULL DEFAULT 1,
	`rewardApplied` boolean NOT NULL DEFAULT false,
	`rewardAppliedAt` timestamp,
	`status` enum('pending','completed','expired') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referralTracking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptionPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`tier` enum('basic','elite','pro') NOT NULL,
	`monthlyPrice` decimal(10,2) NOT NULL,
	`annualPrice` decimal(10,2),
	`description` text,
	`features` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptionPlans_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptionPlans_tier_unique` UNIQUE(`tier`)
);
--> statement-breakpoint
CREATE TABLE `userSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`planId` int NOT NULL,
	`status` enum('trial','active','paused','cancelled') NOT NULL DEFAULT 'trial',
	`stripeSubscriptionId` varchar(255),
	`stripeCustomerId` varchar(255),
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`trialEndsAt` timestamp,
	`cancelledAt` timestamp,
	`autoRenew` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSubscriptions_userId_unique` UNIQUE(`userId`)
);
