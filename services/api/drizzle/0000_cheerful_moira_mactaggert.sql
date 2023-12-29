CREATE TABLE `users` (
	`id` varchar(20) NOT NULL,
	`observer` boolean NOT NULL DEFAULT false,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
