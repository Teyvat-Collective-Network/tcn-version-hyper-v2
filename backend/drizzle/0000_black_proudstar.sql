CREATE TABLE `attributes` (
	`type` varchar(32) NOT NULL,
	`id` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`emoji` varchar(64) NOT NULL,
	CONSTRAINT `pk_type_id` PRIMARY KEY(`type`,`id`)
);
--> statement-breakpoint
CREATE TABLE `audit-logs` (
	`uuid` int AUTO_INCREMENT NOT NULL,
	`action` varchar(32) NOT NULL,
	`user` varchar(32) NOT NULL,
	`token` varchar(256),
	`time` timestamp NOT NULL DEFAULT (now()),
	`reason` text,
	`data` json NOT NULL,
	CONSTRAINT `audit-logs_uuid` PRIMARY KEY(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `autosync` (
	`guild` varchar(20) NOT NULL,
	`repost` boolean NOT NULL,
	`use_webhhook` boolean NOT NULL,
	`channel` varchar(20),
	`webhook` text NOT NULL,
	CONSTRAINT `autosync_guild` PRIMARY KEY(`guild`)
);
--> statement-breakpoint
CREATE TABLE `banshare_logs` (
	`guild` varchar(20) NOT NULL,
	`channel` varchar(20) NOT NULL,
	CONSTRAINT `pk_guild_channel` PRIMARY KEY(`guild`,`channel`)
);
--> statement-breakpoint
CREATE TABLE `banshare_settings` (
	`guild` varchar(20) NOT NULL,
	`no_button` boolean NOT NULL,
	`daedalus` boolean NOT NULL,
	`block_dms` boolean NOT NULL,
	`channel` varchar(20),
	CONSTRAINT `banshare_settings_guild` PRIMARY KEY(`guild`)
);
--> statement-breakpoint
CREATE TABLE `banshares` (
	`message` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL,
	`guild` varchar(20) NOT NULL,
	`created` timestamp NOT NULL,
	`reminded` timestamp NOT NULL,
	`ids` text NOT NULL,
	`reason` text NOT NULL,
	`evidence` text NOT NULL,
	`severity` enum('DM','P0','P1','P2') NOT NULL,
	`status` enum('pending','rejected','published','rescinded'),
	`urgent` boolean NOT NULL,
	`rejecter` varchar(20),
	`publisher` varchar(20),
	`rescinder` varchar(20),
	CONSTRAINT `banshares_message` PRIMARY KEY(`message`)
);
--> statement-breakpoint
CREATE TABLE `character_attributes` (
	`character` varchar(32) NOT NULL,
	`type` varchar(32) NOT NULL,
	`value` varchar(32) NOT NULL,
	CONSTRAINT `pk_character_type` PRIMARY KEY(`character`,`type`)
);
--> statement-breakpoint
CREATE TABLE `characters` (
	`id` varchar(32) NOT NULL,
	`display_name` varchar(32),
	`full_name` varchar(64) NOT NULL,
	CONSTRAINT `characters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `docs` (
	`id` varchar(32) NOT NULL,
	`author` varchar(32) NOT NULL,
	`allow_council` boolean NOT NULL,
	`allow_everyone` boolean NOT NULL,
	`allow_logged_in` boolean NOT NULL,
	`anon` boolean NOT NULL,
	`deleted` boolean NOT NULL,
	`title` varchar(256) NOT NULL,
	`body` text NOT NULL,
	`embed_body` varchar(4096) NOT NULL,
	`embed_color` int NOT NULL,
	`embed_image` varchar(4096) NOT NULL,
	`embed_thumbnail` boolean NOT NULL,
	`embed_title` varchar(256) NOT NULL,
	`official` boolean NOT NULL,
	CONSTRAINT `docs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `docs_allowlist` (
	`id` varchar(32) NOT NULL,
	`user` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_user` PRIMARY KEY(`id`,`user`)
);
--> statement-breakpoint
CREATE TABLE `election_history` (
	`wave` int NOT NULL,
	`user` varchar(20) NOT NULL,
	`status` enum('elected','notelected','accepted','declined','nominated','unknown') NOT NULL,
	`rerunning` boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE `election_history_waves` (
	`wave` int NOT NULL,
	`seats` int NOT NULL,
	`time` timestamp NOT NULL,
	CONSTRAINT `election_history_waves_wave` PRIMARY KEY(`wave`)
);
--> statement-breakpoint
CREATE TABLE `global_channel_bans` (
	`id` int NOT NULL,
	`user` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_user` PRIMARY KEY(`id`,`user`)
);
--> statement-breakpoint
CREATE TABLE `global_channel_mods` (
	`id` int NOT NULL,
	`user` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_user` PRIMARY KEY(`id`,`user`)
);
--> statement-breakpoint
CREATE TABLE `global_channels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`public` boolean NOT NULL,
	`logs` varchar(20) NOT NULL,
	`panic` boolean NOT NULL,
	`ignore_filter` boolean NOT NULL,
	`info_on_user_prompts` boolean NOT NULL,
	`local_mods_can_ban` boolean NOT NULL,
	CONSTRAINT `global_channels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `global_connection_bans` (
	`id` int NOT NULL,
	`guild` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_guild_user` PRIMARY KEY(`id`,`guild`,`user`)
);
--> statement-breakpoint
CREATE TABLE `global_connections` (
	`id` int NOT NULL,
	`guild` varchar(20) NOT NULL,
	`channel` varchar(20) NOT NULL,
	`reply_style` enum('text','embed','buttons') NOT NULL,
	`show_tag` boolean NOT NULL,
	`show_server` boolean NOT NULL,
	`suspended` boolean NOT NULL,
	CONSTRAINT `pk_id_guild` PRIMARY KEY(`id`,`guild`)
);
--> statement-breakpoint
CREATE TABLE `global_filter` (
	`id` int AUTO_INCREMENT NOT NULL,
	`match` varchar(128) NOT NULL,
	`user` varchar(20) NOT NULL,
	`created` timestamp NOT NULL,
	`updated` timestamp NOT NULL,
	CONSTRAINT `global_filter_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `global_info_on_user_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `global_info_on_user_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `global_info_request_guilds` (
	`id` int NOT NULL,
	`guild` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_guild` PRIMARY KEY(`id`,`guild`)
);
--> statement-breakpoint
CREATE TABLE `global_info_request_instances` (
	`id` int NOT NULL,
	`channel` varchar(20) NOT NULL,
	`message` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_channel` PRIMARY KEY(`id`,`channel`)
);
--> statement-breakpoint
CREATE TABLE `global_message_instances` (
	`origin` varchar(20) NOT NULL,
	`guild` varchar(20) NOT NULL,
	`channel` varchar(20) NOT NULL,
	`message` varchar(20) NOT NULL,
	CONSTRAINT `pk_origin_guild` PRIMARY KEY(`origin`,`guild`)
);
--> statement-breakpoint
CREATE TABLE `global_messages` (
	`message` varchar(20) NOT NULL,
	`channel` varchar(20) NOT NULL,
	`author` varchar(20) NOT NULL,
	`global` int NOT NULL,
	CONSTRAINT `global_messages_message` PRIMARY KEY(`message`)
);
--> statement-breakpoint
CREATE TABLE `global_users` (
	`user` varchar(20) NOT NULL,
	`nickname` varchar(36) NOT NULL,
	CONSTRAINT `global_users_user` PRIMARY KEY(`user`)
);
--> statement-breakpoint
CREATE TABLE `global_webhooks` (
	`id` varchar(20) NOT NULL,
	CONSTRAINT `global_webhooks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `guild_roles` (
	`guild` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL,
	`role` varchar(20) NOT NULL,
	`added` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pk_guild_user_role` PRIMARY KEY(`guild`,`user`,`role`)
);
--> statement-breakpoint
CREATE TABLE `guild_users` (
	`guild` varchar(20) NOT NULL,
	`user` varchar(20) NOT NULL,
	`staff` boolean NOT NULL,
	`updated` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pk_guild_user` PRIMARY KEY(`guild`,`user`)
);
--> statement-breakpoint
CREATE TABLE `guilds` (
	`id` varchar(20) NOT NULL,
	`name` varchar(32) NOT NULL,
	`mascot` varchar(32) NOT NULL,
	`owner` varchar(20) NOT NULL,
	`advisor` varchar(20),
	`delegated` boolean NOT NULL,
	`inducted` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `guilds_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invalidations` (
	`user` varchar(20) NOT NULL,
	`time` timestamp NOT NULL,
	CONSTRAINT `invalidations_user` PRIMARY KEY(`user`)
);
--> statement-breakpoint
CREATE TABLE `observation_records` (
	`uuid` int AUTO_INCREMENT NOT NULL,
	`guild` varchar(20) NOT NULL,
	`hidden` boolean NOT NULL,
	`name` varchar(128) NOT NULL,
	`observer` varchar(20),
	`start` timestamp,
	`end` timestamp,
	`status` enum('pending','rejecting','retracted','declined','rejected','canceled','observing','observed','reporting','waiting','voting','inducted','preapproved') NOT NULL,
	`notes` text NOT NULL,
	CONSTRAINT `observation_records_uuid` PRIMARY KEY(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `poll_candidates` (
	`id` int NOT NULL,
	`user` varchar(20) NOT NULL,
	CONSTRAINT `pk_id_user` PRIMARY KEY(`id`,`user`)
);
--> statement-breakpoint
CREATE TABLE `poll_options` (
	`id` int NOT NULL,
	`option` varchar(100) NOT NULL,
	CONSTRAINT `pk_id_option` PRIMARY KEY(`id`,`option`)
);
--> statement-breakpoint
CREATE TABLE `polls` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` varchar(20) NOT NULL,
	`mode` enum('induction','proposal','election','selection') NOT NULL,
	`close` timestamp NOT NULL,
	`closed` boolean NOT NULL,
	`dm` boolean NOT NULL,
	`duration` bigint NOT NULL,
	`live` boolean NOT NULL,
	`min` int NOT NULL,
	`max` int NOT NULL,
	`preinduct` boolean NOT NULL,
	`question` varchar(256) NOT NULL,
	`quorum` int NOT NULL,
	`restricted` boolean NOT NULL,
	`seats` int NOT NULL,
	`server` varchar(64) NOT NULL,
	`wave` int NOT NULL,
	CONSTRAINT `polls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rolesync_api_to_role` (
	`guild` varchar(20) NOT NULL,
	`type` enum('position','role') NOT NULL,
	`position` enum('observer','owner','advisor','voter','council','staff') NOT NULL,
	`role` varchar(32) NOT NULL,
	`origin` varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rolesync_role_to_api` (
	`guild` varchar(20) NOT NULL,
	`role` varchar(20) NOT NULL,
	`api_role` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rolesync_role_to_staff` (
	`guild` varchar(20) NOT NULL,
	`role` varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `share_links` (
	`id` varchar(64) NOT NULL,
	`content` text NOT NULL,
	`time` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `share_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `short_links` (
	`id` varchar(128) NOT NULL,
	`owner` varchar(20) NOT NULL,
	`url` text NOT NULL,
	CONSTRAINT `short_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`user` varchar(20) NOT NULL,
	`role` varchar(32) NOT NULL,
	`added` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pk_user_role` PRIMARY KEY(`user`,`role`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(20) NOT NULL,
	`observer` boolean NOT NULL,
	`observer_since` timestamp NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vote_records` (
	`poll` int NOT NULL,
	`user` varchar(20) NOT NULL,
	`voted` boolean NOT NULL,
	CONSTRAINT `pk_poll_user` PRIMARY KEY(`poll`,`user`)
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`poll` int NOT NULL,
	`user` varchar(20) NOT NULL,
	`abstain` boolean NOT NULL,
	`yes` boolean,
	`verdict` enum('preinduct','induct','extend','reject') NOT NULL,
	`candidates` json NOT NULL,
	`selected` json NOT NULL,
	CONSTRAINT `pk_poll_user` PRIMARY KEY(`poll`,`user`)
);
--> statement-breakpoint
CREATE INDEX `idx_time` ON `audit-logs` (`time`);--> statement-breakpoint
CREATE INDEX `idx_user` ON `global_channel_bans` (`user`);--> statement-breakpoint
CREATE INDEX `idx_user` ON `global_channel_mods` (`user`);--> statement-breakpoint
CREATE INDEX `idx_message` ON `global_message_instances` (`message`);--> statement-breakpoint
CREATE INDEX `idx_message` ON `polls` (`message`);--> statement-breakpoint
CREATE INDEX `idx_time` ON `share_links` (`time`);--> statement-breakpoint
CREATE INDEX `idx_owner` ON `short_links` (`owner`);