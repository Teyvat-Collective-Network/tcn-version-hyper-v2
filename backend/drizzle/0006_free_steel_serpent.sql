CREATE TABLE `banshare_autoban_settings` (
	`guild` varchar(20) NOT NULL,
	`severity` enum('DM','P0','P1','P2') NOT NULL,
	`member` boolean NOT NULL,
	`nonmember` boolean NOT NULL,
	CONSTRAINT `pk_guild_severity` PRIMARY KEY(`guild`,`severity`)
);
