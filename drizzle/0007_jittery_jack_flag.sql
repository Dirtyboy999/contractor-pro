CREATE TABLE `jobCosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`estimatedLaborCost` decimal(12,2) NOT NULL,
	`actualLaborCost` decimal(12,2) DEFAULT '0',
	`estimatedMaterialCost` decimal(12,2) NOT NULL,
	`actualMaterialCost` decimal(12,2) DEFAULT '0',
	`estimatedEquipmentCost` decimal(12,2) DEFAULT '0',
	`actualEquipmentCost` decimal(12,2) DEFAULT '0',
	`estimatedOtherCost` decimal(12,2) DEFAULT '0',
	`actualOtherCost` decimal(12,2) DEFAULT '0',
	`totalEstimatedCost` decimal(12,2) NOT NULL,
	`totalActualCost` decimal(12,2) DEFAULT '0',
	`profitMargin` decimal(8,2),
	`profitMarginPercent` decimal(5,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobCosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `jobCosts_projectId_unique` UNIQUE(`projectId`)
);
--> statement-breakpoint
CREATE TABLE `laborCostEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`employeeId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`hours` decimal(8,2) NOT NULL,
	`hourlyRate` decimal(10,2) NOT NULL,
	`totalCost` decimal(12,2) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `laborCostEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `materialCostEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`itemId` int,
	`date` varchar(10) NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`unitCost` decimal(10,2) NOT NULL,
	`totalCost` decimal(12,2) NOT NULL,
	`supplier` varchar(255),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `materialCostEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payrollRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`employeeId` int NOT NULL,
	`payPeriodStart` varchar(10) NOT NULL,
	`payPeriodEnd` varchar(10) NOT NULL,
	`regularHours` decimal(8,2) NOT NULL,
	`overtimeHours` decimal(8,2) DEFAULT '0',
	`regularPay` decimal(12,2) NOT NULL,
	`overtimePay` decimal(12,2) DEFAULT '0',
	`grossPay` decimal(12,2) NOT NULL,
	`federalTax` decimal(12,2) DEFAULT '0',
	`stateTax` decimal(12,2) DEFAULT '0',
	`socialSecurityTax` decimal(12,2) DEFAULT '0',
	`medicareTax` decimal(12,2) DEFAULT '0',
	`otherDeductions` decimal(12,2) DEFAULT '0',
	`netPay` decimal(12,2) NOT NULL,
	`status` enum('draft','processed','paid','failed') NOT NULL DEFAULT 'draft',
	`paymentMethod` enum('direct-deposit','check','cash') NOT NULL DEFAULT 'direct-deposit',
	`paymentDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payrollRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payrollSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`hourlyRate` decimal(10,2) NOT NULL,
	`overtimeRate` decimal(10,2),
	`federalTaxRate` decimal(5,2) DEFAULT '12',
	`stateTaxRate` decimal(5,2) DEFAULT '5',
	`socialSecurityRate` decimal(5,2) DEFAULT '6.2',
	`medicareRate` decimal(5,2) DEFAULT '1.45',
	`otherDeductions` decimal(10,2) DEFAULT '0',
	`bankAccount` varchar(50),
	`bankRoutingNumber` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payrollSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `payrollSettings_employeeId_unique` UNIQUE(`employeeId`)
);
