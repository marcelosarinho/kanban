ALTER TABLE "error_logs" ALTER COLUMN "context" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "error_logs" ALTER COLUMN "context" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "error_logs" DROP COLUMN "timestamp";--> statement-breakpoint
ALTER TABLE "error_logs" DROP COLUMN "updated_at";