CREATE TABLE `clientPortalAccess` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`clientId` int NOT NULL,
	`accessToken` varchar(255) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `clientPortalAccess_id` PRIMARY KEY(`id`),
	CONSTRAINT `clientPortalAccess_accessToken_unique` UNIQUE(`accessToken`)
);
--> statement-breakpoint
CREATE TABLE `emailTemplates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('invoice_sent','bid_sent','payment_reminder','progress_update','project_completion') NOT NULL,
	`subject` varchar(255) NOT NULL,
	`htmlContent` longtext,
	`isDefault` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emailTemplates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `progressUpdates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int NOT NULL,
	`phaseId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`percentComplete` int DEFAULT 0,
	`photoId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `progressUpdates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projectPhases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`status` enum('not_started','in_progress','completed') DEFAULT 'not_started',
	`startDate` timestamp,
	`endDate` timestamp,
	`displayOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projectPhases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projectPhotos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int NOT NULL,
	`photoUrl` varchar(500) NOT NULL,
	`photoKey` varchar(255) NOT NULL,
	`caption` text,
	`photoType` enum('before','after','progress','completion') DEFAULT 'progress',
	`displayOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `projectPhotos_id` PRIMARY KEY(`id`)
);
