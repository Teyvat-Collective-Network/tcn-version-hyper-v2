CREATE TABLE `remaining_banshare_targets` (
	`origin` varchar(20) NOT NULL,
	`guild` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `banshare_ids` DROP PRIMARY KEY;--> statement-breakpoint
CREATE INDEX `idx_origin_guild` ON `remaining_banshare_targets` (`origin`,`guild`);--> statement-breakpoint
CREATE INDEX `idx_message_user` ON `banshare_ids` (`message`,`user`);