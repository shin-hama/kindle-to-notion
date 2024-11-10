drop trigger if exists "my_webhook" on "public"."Books_NotionUsers";

drop trigger if exists "Create  Hilghlight on notion" on "public"."Highlight";

CREATE TRIGGER "ExportBooksOnNotion" AFTER INSERT ON public."Books_NotionUsers" FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/notion-wrapper/books', 'POST', '{"Content-type":"application/json"}', '{}', '1000');

CREATE TRIGGER "ExportHighlightsOnNotion" AFTER INSERT ON public."Highlight" FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/notion-wrapper/highlights', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


