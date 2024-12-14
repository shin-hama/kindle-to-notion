create table "public"."Books_Genres" (
    "book_id" character varying not null,
    "created_at" timestamp with time zone not null default now(),
    "genre_id" uuid not null
);


alter table "public"."Books_Genres" enable row level security;

create table "public"."Genres" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."Genres" enable row level security;

CREATE UNIQUE INDEX "Books_Genres_pkey" ON public."Books_Genres" USING btree (book_id, genre_id);

CREATE UNIQUE INDEX "Genres_name_key" ON public."Genres" USING btree (name);

CREATE UNIQUE INDEX "Genres_pkey" ON public."Genres" USING btree (id);

alter table "public"."Books_Genres" add constraint "Books_Genres_pkey" PRIMARY KEY using index "Books_Genres_pkey";

alter table "public"."Genres" add constraint "Genres_pkey" PRIMARY KEY using index "Genres_pkey";

alter table "public"."Books_Genres" add constraint "Books_Genres_book_id_fkey" FOREIGN KEY (book_id) REFERENCES "Book"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Books_Genres" validate constraint "Books_Genres_book_id_fkey";

alter table "public"."Books_Genres" add constraint "Books_Genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES "Genres"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Books_Genres" validate constraint "Books_Genres_genre_id_fkey";

alter table "public"."Genres" add constraint "Genres_name_key" UNIQUE using index "Genres_name_key";

grant delete on table "public"."Books_Genres" to "anon";

grant insert on table "public"."Books_Genres" to "anon";

grant references on table "public"."Books_Genres" to "anon";

grant select on table "public"."Books_Genres" to "anon";

grant trigger on table "public"."Books_Genres" to "anon";

grant truncate on table "public"."Books_Genres" to "anon";

grant update on table "public"."Books_Genres" to "anon";

grant delete on table "public"."Books_Genres" to "authenticated";

grant insert on table "public"."Books_Genres" to "authenticated";

grant references on table "public"."Books_Genres" to "authenticated";

grant select on table "public"."Books_Genres" to "authenticated";

grant trigger on table "public"."Books_Genres" to "authenticated";

grant truncate on table "public"."Books_Genres" to "authenticated";

grant update on table "public"."Books_Genres" to "authenticated";

grant delete on table "public"."Books_Genres" to "service_role";

grant insert on table "public"."Books_Genres" to "service_role";

grant references on table "public"."Books_Genres" to "service_role";

grant select on table "public"."Books_Genres" to "service_role";

grant trigger on table "public"."Books_Genres" to "service_role";

grant truncate on table "public"."Books_Genres" to "service_role";

grant update on table "public"."Books_Genres" to "service_role";

grant delete on table "public"."Genres" to "anon";

grant insert on table "public"."Genres" to "anon";

grant references on table "public"."Genres" to "anon";

grant select on table "public"."Genres" to "anon";

grant trigger on table "public"."Genres" to "anon";

grant truncate on table "public"."Genres" to "anon";

grant update on table "public"."Genres" to "anon";

grant delete on table "public"."Genres" to "authenticated";

grant insert on table "public"."Genres" to "authenticated";

grant references on table "public"."Genres" to "authenticated";

grant select on table "public"."Genres" to "authenticated";

grant trigger on table "public"."Genres" to "authenticated";

grant truncate on table "public"."Genres" to "authenticated";

grant update on table "public"."Genres" to "authenticated";

grant delete on table "public"."Genres" to "service_role";

grant insert on table "public"."Genres" to "service_role";

grant references on table "public"."Genres" to "service_role";

grant select on table "public"."Genres" to "service_role";

grant trigger on table "public"."Genres" to "service_role";

grant truncate on table "public"."Genres" to "service_role";

grant update on table "public"."Genres" to "service_role";


