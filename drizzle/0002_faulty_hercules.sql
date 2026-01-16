CREATE TABLE `notificationPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailOnPaymentReceived` boolean NOT NULL DEFAULT true,
	`emailOnPaymentOverdue` boolean NOT NULL DEFAULT true,
	`emailOnBidViewed` boolean NOT NULL DEFAULT true,
	`emailOnBidDecision` boolean NOT NULL DEFAULT true,
	`emailOnInvoiceSent` boolean NOT NULL DEFAULT false,
	`inAppNotifications` boolean NOT NULL DEFAULT true,
	`paymentReminderDaysBefore` int NOT NULL DEFAULT 2,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notificationPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notificationPreferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('invoice_sent','invoice_viewed','payment_received','payment_due_reminder','payment_overdue','bid_sent','bid_viewed','bid_accepted','bid_rejected','bid_expired','project_created','project_completed','client_added','item_low_stock','system_alert') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`relatedEntityType` varchar(50),
	`relatedEntityId` int,
	`isRead` boolean NOT NULL DEFAULT false,
	`sentViaEmail` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`readAt` timestamp,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
