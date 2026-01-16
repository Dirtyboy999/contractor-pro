CREATE TABLE `financingCommissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`financingRequestId` int NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`status` enum('pending','paid','cancelled') NOT NULL DEFAULT 'pending',
	`paidAt` timestamp,
	`stripePayoutId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financingCommissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `financingPayments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`financingRequestId` int NOT NULL,
	`paymentNumber` int NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`dueDate` timestamp NOT NULL,
	`paidDate` timestamp,
	`status` enum('pending','paid','late','failed') NOT NULL DEFAULT 'pending',
	`externalPaymentId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financingPayments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `financingRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`invoiceId` int NOT NULL,
	`clientId` int NOT NULL,
	`userId` int NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`lendingPartner` enum('affirm','klarna','lendingClub') NOT NULL,
	`monthlyPayment` decimal(12,2),
	`interestRate` decimal(5,2),
	`term` int NOT NULL DEFAULT 24,
	`status` enum('pending','approved','rejected','completed','cancelled') NOT NULL DEFAULT 'pending',
	`externalFinancingId` varchar(255),
	`contractorCommission` decimal(12,2),
	`contractorPaid` boolean NOT NULL DEFAULT false,
	`paidAt` timestamp,
	`appliedAt` timestamp,
	`approvedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financingRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `financingSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`financingEnabled` boolean NOT NULL DEFAULT true,
	`affirm` boolean NOT NULL DEFAULT true,
	`klarna` boolean NOT NULL DEFAULT true,
	`lendingClub` boolean NOT NULL DEFAULT true,
	`minFinancingAmount` decimal(12,2) DEFAULT '500',
	`maxFinancingAmount` decimal(12,2) DEFAULT '50000',
	`commissionPercentage` decimal(5,2) DEFAULT '2.5',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financingSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `financingSettings_userId_unique` UNIQUE(`userId`)
);
