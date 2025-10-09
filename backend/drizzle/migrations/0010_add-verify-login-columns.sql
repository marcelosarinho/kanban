ALTER TABLE "users" ADD COLUMN "verify_login_token" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_verified_login_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_login_verify" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "ip" varchar(255);