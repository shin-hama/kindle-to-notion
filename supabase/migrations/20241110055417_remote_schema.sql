drop trigger if exists "my_webhook" on "public"."Book";

create table "public"."Notifications" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "is_active" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "settings" json not null
);


alter table "public"."Notifications" enable row level security;

CREATE UNIQUE INDEX "Notifications_pkey" ON public."Notifications" USING btree (id);

CREATE UNIQUE INDEX "Notifications_userId_key" ON public."Notifications" USING btree (user_id);

alter table "public"."Notifications" add constraint "Notifications_pkey" PRIMARY KEY using index "Notifications_pkey";

alter table "public"."Notifications" add constraint "Notifications_userId_fkey" FOREIGN KEY (user_id) REFERENCES "NotionUser"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Notifications" validate constraint "Notifications_userId_fkey";

alter table "public"."Notifications" add constraint "Notifications_userId_key" UNIQUE using index "Notifications_userId_key";

create or replace view "public"."random_highlights" as  SELECT h."userId",
    h.text,
    h.note,
    b.title
   FROM "Highlight" h,
    "Book" b
  WHERE ((h."bookId")::text = (b.id)::text)
  ORDER BY (random());


grant delete on table "public"."Notifications" to "anon";

grant insert on table "public"."Notifications" to "anon";

grant references on table "public"."Notifications" to "anon";

grant select on table "public"."Notifications" to "anon";

grant trigger on table "public"."Notifications" to "anon";

grant truncate on table "public"."Notifications" to "anon";

grant update on table "public"."Notifications" to "anon";

grant delete on table "public"."Notifications" to "authenticated";

grant insert on table "public"."Notifications" to "authenticated";

grant references on table "public"."Notifications" to "authenticated";

grant select on table "public"."Notifications" to "authenticated";

grant trigger on table "public"."Notifications" to "authenticated";

grant truncate on table "public"."Notifications" to "authenticated";

grant update on table "public"."Notifications" to "authenticated";

grant delete on table "public"."Notifications" to "service_role";

grant insert on table "public"."Notifications" to "service_role";

grant references on table "public"."Notifications" to "service_role";

grant select on table "public"."Notifications" to "service_role";

grant trigger on table "public"."Notifications" to "service_role";

grant truncate on table "public"."Notifications" to "service_role";

grant update on table "public"."Notifications" to "service_role";

create policy "Enable read access for anon key"
on "public"."Highlight"
as permissive
for select
to anon
using (true);


create policy "Enable read access for all users"
on "public"."NotionUser"
as permissive
for select
to anon
using (true);


CREATE TRIGGER my_webhook AFTER INSERT ON public."Books_NotionUsers" FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/notion-wrapper/books', 'POST', '{"Content-Type":"application/json"}', '{}', '1000');

CREATE TRIGGER "Create  Hilghlight on notion" AFTER INSERT ON public."Highlight" FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/notion-wrapper/highlights', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


