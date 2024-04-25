CREATE TABLE IF NOT EXISTS "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"body" varchar NOT NULL,
	"authorId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "starred_blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"blogId" integer NOT NULL,
	"userId" integer,
	"starred" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
