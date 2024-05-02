ALTER TABLE "user" ALTER COLUMN "sessionId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "salt" varchar NOT NULL;