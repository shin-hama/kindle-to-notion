alter table "public"."Highlight" add column "notionPageId" character varying;

CREATE UNIQUE INDEX "Highlight_notionPageId_key" ON public."Highlight" USING btree ("notionPageId");

alter table "public"."Highlight" add constraint "Highlight_notionPageId_key" UNIQUE using index "Highlight_notionPageId_key";


