CREATE TABLE `audit-log-reason-history` (
	`uuid` int NOT NULL,
	`reason` text,
	`time` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
ALTER TABLE `banshare_settings` MODIFY COLUMN `no_button` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `banshare_settings` MODIFY COLUMN `daedalus` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `banshare_settings` MODIFY COLUMN `block_dms` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `banshares` MODIFY COLUMN `status` enum('pending','rejected','published','rescinded') NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_uuid_time` ON `audit-log-reason-history` (`uuid`,`time`);--> statement-breakpoint
CREATE INDEX `idx_time` ON `audit-log-reason-history` (`time`);--> statement-breakpoint
ALTER TABLE `audit-logs` DROP COLUMN `token`;