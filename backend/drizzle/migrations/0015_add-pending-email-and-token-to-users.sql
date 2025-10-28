ALTER TABLE "users" ADD COLUMN "pending_email" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pending_email_token" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pending_email_token_expiry" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_pending_email_unique" UNIQUE("pending_email");