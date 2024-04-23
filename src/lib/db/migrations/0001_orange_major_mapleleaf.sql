CREATE TABLE IF NOT EXISTS "starred_blogs" (
	"blogId" integer NOT NULL,
	"userId" integer NOT NULL,
	"starred" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "starred_blogs" ADD CONSTRAINT "starred_blogs_blogId_blog_id_fk" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "starred_blogs" ADD CONSTRAINT "starred_blogs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
