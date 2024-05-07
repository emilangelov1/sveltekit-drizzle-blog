ALTER TABLE "blog" ALTER COLUMN "authorId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "starred_blogs" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "sessionId" SET NOT NULL;