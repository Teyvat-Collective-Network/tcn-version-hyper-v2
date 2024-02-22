CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`invite` varchar(32) NOT NULL,
	`guild` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL,
	`channel` varchar(20) NOT NULL,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `unq_channel` UNIQUE(`channel`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `observer_since` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `owner` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `advisor` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `voter` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `council` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `staff` boolean NOT NULL;