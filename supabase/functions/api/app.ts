import { Hono } from "npm:hono";
import { books } from "./routes/books/books.route.ts";
import { highlights } from "./routes/highlights/highlights.route.ts";
import { users } from "./routes/users/users.route.ts";
import { notifications } from "./routes/notifications/notifications.route.ts";

const app = new Hono()
  .route("/books", books)
  .route("/highlights", highlights)
  .route("/users", users)
  .route("/notifications", notifications)
  .get("/health", (c) => {
    console.log("Hello Hono!");
    return c.text("Hello Hono!");
  })
  .get("/kindle/open", (c) => {
    const asin = c.req.query("asin");
    if (!asin) {
      return c.redirect(`kindle://book?action=open`);
    }
    const query = new URLSearchParams({ asin: asin as string });

    const location = c.req.query("location");
    if (location) {
      query.append("location", location as string);
    }

    return c.redirect(`kindle://book?action=open&${query.toString()}`);
  });

export { app as api };
