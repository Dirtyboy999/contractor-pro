CREATE TABLE `appActivityLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(255) NOT NULL,
	`action` varchar(255) NOT NULL,
	`screen` varchar(255),
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `appActivityLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `appPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(255),
	`theme` enum('light','dark','auto') NOT NULL DEFAULT 'auto',
	`notifications` boolean NOT NULL DEFAULT true,
	`biometricAuth` boolean NOT NULL DEFAULT false,
	`autoSync` boolean NOT NULL DEFAULT true,
	`offlineMode` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `appPreferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `calendarIntegrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`provider` enum('google','outlook','ical') NOT NULL,
	`accessToken` text NOT NULL,
	`refreshToken` text,
	`expiresAt` timestamp,
	`calendarId` varchar(255),
	`syncEnabled` boolean NOT NULL DEFAULT true,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calendarIntegrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crewAssignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scheduleId` int NOT NULL,
	`employeeId` int NOT NULL,
	`role` varchar(100),
	`assignedAt` timestamp NOT NULL DEFAULT (now()),
	`confirmedAt` timestamp,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `crewAssignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mobileDevices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(255) NOT NULL,
	`platform` enum('ios','android','web') NOT NULL,
	`osVersion` varchar(50),
	`appVersion` varchar(50),
	`pushToken` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastActiveAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mobileDevices_id` PRIMARY KEY(`id`),
	CONSTRAINT `mobileDevices_deviceId_unique` UNIQUE(`deviceId`)
);
--> statement-breakpoint
CREATE TABLE `offlineSyncQueue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(255) NOT NULL,
	`action` enum('create','update','delete') NOT NULL,
	`entityType` varchar(100) NOT NULL,
	`entityId` int NOT NULL,
	`data` json,
	`synced` boolean NOT NULL DEFAULT false,
	`syncedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `offlineSyncQueue_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resellerClients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resellerId` int NOT NULL,
	`clientId` int NOT NULL,
	`monthlyFee` decimal(12,2) NOT NULL,
	`status` enum('active','paused','cancelled') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resellerClients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resellerCommissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resellerId` int NOT NULL,
	`month` varchar(7) NOT NULL,
	`totalRevenue` decimal(12,2) NOT NULL,
	`commissionAmount` decimal(12,2) NOT NULL,
	`status` enum('pending','processed','paid') NOT NULL DEFAULT 'pending',
	`paidAt` timestamp,
	`stripePayoutId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resellerCommissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resellers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`domain` varchar(255),
	`logo` text,
	`primaryColor` varchar(7),
	`secondaryColor` varchar(7),
	`commissionRate` decimal(5,2) NOT NULL DEFAULT '30.00',
	`totalClients` int NOT NULL DEFAULT 0,
	`monthlyRevenue` decimal(12,2) NOT NULL DEFAULT '0.00',
	`status` enum('pending','active','suspended','inactive') NOT NULL DEFAULT 'pending',
	`tier` enum('starter','pro','enterprise') NOT NULL DEFAULT 'starter',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resellers_id` PRIMARY KEY(`id`),
	CONSTRAINT `resellers_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `resellers_domain_unique` UNIQUE(`domain`)
);
--> statement-breakpoint
CREATE TABLE `routeOptimizations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scheduleId` int NOT NULL,
	`optimizedRoute` json,
	`estimatedTravelTime` int,
	`estimatedDistance` decimal(10,2),
	`fuelCostEstimate` decimal(10,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `routeOptimizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `schedules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int NOT NULL,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`estimatedHours` int,
	`actualHours` int,
	`status` enum('scheduled','in_progress','completed','cancelled') NOT NULL DEFAULT 'scheduled',
	`notes` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `schedules_id` PRIMARY KEY(`id`)
);
