

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."HighlightColor" AS ENUM (
    'blue',
    'orange',
    'pink',
    'yellow'
);


ALTER TYPE "public"."HighlightColor" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Book" (
    "id" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" character varying NOT NULL,
    "author" "text" NOT NULL,
    "asin" character varying NOT NULL,
    "url" "text",
    "imageUrl" "text"
);


ALTER TABLE "public"."Book" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Book"."id" IS 'タイトルのハッシュ値を利用';



CREATE TABLE IF NOT EXISTS "public"."Books_NotionUsers" (
    "bookId" character varying NOT NULL,
    "userId" "uuid" NOT NULL,
    "lastAnnotatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."Books_NotionUsers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Highlight" (
    "bookId" character varying NOT NULL,
    "userId" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "color" "public"."HighlightColor" NOT NULL,
    "text" "text" NOT NULL,
    "location" integer DEFAULT 0 NOT NULL,
    "page" integer,
    "note" "text",
    "id" character varying NOT NULL
);


ALTER TABLE "public"."Highlight" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Highlight"."id" IS 'Amazon が生成した ID を保存する';



CREATE TABLE IF NOT EXISTS "public"."NotionPage" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "page_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "books_db_id" character varying NOT NULL,
    "highlights_db_id" character varying NOT NULL
);


ALTER TABLE "public"."NotionPage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."NotionSecret" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "access_token" character varying NOT NULL,
    "user_id" "uuid" NOT NULL,
    "iv" character varying NOT NULL
);


ALTER TABLE "public"."NotionSecret" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."NotionUser" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "bot_id" "text" NOT NULL,
    "notion_uid" "text" NOT NULL,
    "name" character varying,
    "avatar_url" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "workspace_id" character varying NOT NULL,
    "workspace_name" character varying,
    "workspace_icon" "text"
);


ALTER TABLE "public"."NotionUser" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Book"
    ADD CONSTRAINT "Book_asin_key" UNIQUE ("asin");



ALTER TABLE ONLY "public"."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Books_NotionUsers"
    ADD CONSTRAINT "Books_NotionUsers_pkey" PRIMARY KEY ("bookId", "userId");



ALTER TABLE ONLY "public"."Highlight"
    ADD CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."NotionPage"
    ADD CONSTRAINT "NotionPage_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."NotionSecret"
    ADD CONSTRAINT "NotionSecret_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."NotionUser"
    ADD CONSTRAINT "NotionUser_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Highlight"
    ADD CONSTRAINT "unique_highlight_on_book_and_user" UNIQUE ("id", "bookId", "userId");



CREATE OR REPLACE TRIGGER "my_webhook" AFTER INSERT ON "public"."Book" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('http://localhost:3000', 'POST', '{"Content-Type":"application/json"}', '{}', '1000');



ALTER TABLE ONLY "public"."Books_NotionUsers"
    ADD CONSTRAINT "Books_NotionUsers_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Books_NotionUsers"
    ADD CONSTRAINT "Books_NotionUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."NotionUser"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Highlight"
    ADD CONSTRAINT "Highlight_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Highlight"
    ADD CONSTRAINT "Highlight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."NotionUser"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."NotionPage"
    ADD CONSTRAINT "NotionPage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."NotionUser"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."NotionSecret"
    ADD CONSTRAINT "NotionSecret_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."NotionUser"("id") ON DELETE CASCADE;



ALTER TABLE "public"."Book" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Books_NotionUsers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable Update for admin only" ON "public"."NotionUser" FOR UPDATE TO "supabase_admin" USING (true);



CREATE POLICY "Enable insert for admin only" ON "public"."NotionPage" FOR INSERT TO "supabase_admin" WITH CHECK (true);



CREATE POLICY "Enable insert for admin only" ON "public"."NotionUser" FOR INSERT TO "supabase_admin" WITH CHECK (true);



CREATE POLICY "Enable insert secret for admin" ON "public"."NotionSecret" FOR INSERT TO "supabase_admin" WITH CHECK (true);



CREATE POLICY "Enable read access for admin" ON "public"."NotionPage" FOR SELECT TO "supabase_admin" USING (true);



CREATE POLICY "Enable read access for admin only" ON "public"."NotionUser" FOR SELECT TO "supabase_admin" USING (true);



CREATE POLICY "Enable read for admin only" ON "public"."NotionSecret" FOR SELECT TO "supabase_admin" USING (true);



CREATE POLICY "Enable update for admin only" ON "public"."NotionPage" FOR UPDATE TO "supabase_admin" USING (true);



CREATE POLICY "Enable update for admin only" ON "public"."NotionSecret" FOR UPDATE TO "supabase_admin" USING (true);



ALTER TABLE "public"."Highlight" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."NotionPage" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."NotionSecret" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."NotionUser" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
























































































































































































































GRANT ALL ON TABLE "public"."Book" TO "anon";
GRANT ALL ON TABLE "public"."Book" TO "authenticated";
GRANT ALL ON TABLE "public"."Book" TO "service_role";



GRANT ALL ON TABLE "public"."Books_NotionUsers" TO "anon";
GRANT ALL ON TABLE "public"."Books_NotionUsers" TO "authenticated";
GRANT ALL ON TABLE "public"."Books_NotionUsers" TO "service_role";



GRANT ALL ON TABLE "public"."Highlight" TO "anon";
GRANT ALL ON TABLE "public"."Highlight" TO "authenticated";
GRANT ALL ON TABLE "public"."Highlight" TO "service_role";



GRANT ALL ON TABLE "public"."NotionPage" TO "anon";
GRANT ALL ON TABLE "public"."NotionPage" TO "authenticated";
GRANT ALL ON TABLE "public"."NotionPage" TO "service_role";



GRANT ALL ON TABLE "public"."NotionSecret" TO "anon";
GRANT ALL ON TABLE "public"."NotionSecret" TO "authenticated";
GRANT ALL ON TABLE "public"."NotionSecret" TO "service_role";



GRANT ALL ON TABLE "public"."NotionUser" TO "anon";
GRANT ALL ON TABLE "public"."NotionUser" TO "authenticated";
GRANT ALL ON TABLE "public"."NotionUser" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
