ALTER TABLE "users" ADD COLUMN "verify_forgot_password_token" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verify_forgot_password_token_expiry" timestamp;