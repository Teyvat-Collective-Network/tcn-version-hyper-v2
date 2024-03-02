CREATE TABLE `banshare_crossposts` (
	`origin` varchar(20) NOT NULL,
	`guild` varchar(20) NOT NULL,
	`channel` varchar(20) NOT NULL,
	`message` varchar(20) NOT NULL,
	CONSTRAINT `pk_origin_guild` PRIMARY KEY(`origin`,`guild`)
);
--> statement-breakpoint
CREATE TABLE `banshare_ids` (
	`message` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL,
	CONSTRAINT `pk_message_user` PRIMARY KEY(`message`,`user`)
);
--> statement-breakpoint
CREATE INDEX `idx_message` ON `banshare_crossposts` (`message`);