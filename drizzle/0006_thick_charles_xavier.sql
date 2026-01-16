CREATE TABLE `attendanceRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`geofenceId` int NOT NULL,
	`clockInTime` timestamp NOT NULL,
	`clockOutTime` timestamp,
	`hoursWorked` decimal(8,2),
	`isManualEntry` boolean NOT NULL DEFAULT false,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `attendanceRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employeeLocations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`geofenceId` int,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`accuracy` decimal(8,2),
	`isInsideGeofence` boolean NOT NULL DEFAULT false,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `employeeLocations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20) NOT NULL,
	`role` varchar(100),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `geofenceAlerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`geofenceId` int NOT NULL,
	`eventType` enum('entry','exit') NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	CONSTRAINT `geofenceAlerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `geofences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int,
	`name` varchar(255) NOT NULL,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`radiusMeters` int NOT NULL DEFAULT 50,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `geofences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`projectId` int,
	`date` varchar(10) NOT NULL,
	`totalHours` decimal(8,2) NOT NULL,
	`clockInCount` int DEFAULT 0,
	`status` enum('in-progress','completed','approved') NOT NULL DEFAULT 'in-progress',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workSessions_id` PRIMARY KEY(`id`)
);
