ALTER TABLE "users" RENAME COLUMN "last_verified_login_at" TO "last_verified_login";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "ip" TO "login_info";