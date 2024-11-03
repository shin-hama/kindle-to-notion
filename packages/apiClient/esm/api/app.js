import { Hono } from "hono";
import { books } from "./routes/books/books.route.js";
import { highlights } from "./routes/highlights/highlights.route.js";
import { users } from "./routes/users/users.route.js";
import { notifications } from "./routes/notifications/notifications.route.js";
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
    const query = new URLSearchParams({ asin: asin });
    const location = c.req.query("location");
    if (location) {
        query.append("location", location);
    }
    return c.redirect(`kindle://book?action=open&${query.toString()}`);
});
export { app as api };
