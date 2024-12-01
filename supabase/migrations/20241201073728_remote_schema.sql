create table "public"."SlackSecret" (
    "created_at" timestamp with time zone not null default now(),
    "userId" uuid not null,
    "accessToken" character varying not null,
    "bodId" character varying not null,
    "scope" text not null,
    "others" json not null
);


alter table "public"."SlackSecret" enable row level security;

CREATE UNIQUE INDEX "SlackSecret_pkey" ON public."SlackSecret" USING btree ("userId");

alter table "public"."SlackSecret" add constraint "SlackSecret_pkey" PRIMARY KEY using index "SlackSecret_pkey";

alter table "public"."SlackSecret" add constraint "SlackSecret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "NotionUser"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SlackSecret" validate constraint "SlackSecret_userId_fkey";

grant delete on table "public"."SlackSecret" to "anon";

grant insert on table "public"."SlackSecret" to "anon";

grant references on table "public"."SlackSecret" to "anon";

grant select on table "public"."SlackSecret" to "anon";

grant trigger on table "public"."SlackSecret" to "anon";

grant truncate on table "public"."SlackSecret" to "anon";

grant update on table "public"."SlackSecret" to "anon";

grant delete on table "public"."SlackSecret" to "authenticated";

grant insert on table "public"."SlackSecret" to "authenticated";

grant references on table "public"."SlackSecret" to "authenticated";

grant select on table "public"."SlackSecret" to "authenticated";

grant trigger on table "public"."SlackSecret" to "authenticated";

grant truncate on table "public"."SlackSecret" to "authenticated";

grant update on table "public"."SlackSecret" to "authenticated";

grant delete on table "public"."SlackSecret" to "service_role";

grant insert on table "public"."SlackSecret" to "service_role";

grant references on table "public"."SlackSecret" to "service_role";

grant select on table "public"."SlackSecret" to "service_role";

grant trigger on table "public"."SlackSecret" to "service_role";

grant truncate on table "public"."SlackSecret" to "service_role";

grant update on table "public"."SlackSecret" to "service_role";


