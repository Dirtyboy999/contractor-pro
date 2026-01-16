CREATE TABLE `paymentMethods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`clientId` int NOT NULL,
	`type` enum('stripe','paypal','chime','bank_transfer','echeck','cash') NOT NULL,
	`provider` varchar(50),
	`providerPaymentMethodId` varchar(255),
	`lastFourDigits` varchar(4),
	`expiryMonth` int,
	`expiryYear` int,
	`isDefault` boolean DEFAULT false,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentMethods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paymentTransactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`invoiceId` int,
	`paymentMethodId` int,
	`amount` decimal(12,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`paymentGateway` enum('stripe','paypal','chime','manual') NOT NULL,
	`transactionId` varchar(255) NOT NULL,
	`status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`failureReason` text,
	`receiptUrl` varchar(500),
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentTransactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `paymentTransactions_transactionId_unique` UNIQUE(`transactionId`)
);
--> statement-breakpoint
CREATE TABLE `recurringInvoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int,
	`clientId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`frequency` enum('weekly','biweekly','monthly','quarterly','yearly') NOT NULL DEFAULT 'monthly',
	`amount` decimal(12,2) NOT NULL,
	`dueDay` int DEFAULT 15,
	`nextInvoiceDate` timestamp,
	`lastInvoiceDate` timestamp,
	`status` enum('active','paused','cancelled') NOT NULL DEFAULT 'active',
	`invoicePrefix` varchar(20) DEFAULT 'REC',
	`maxOccurrences` int,
	`occurrenceCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `recurringInvoices_id` PRIMARY KEY(`id`)
);
