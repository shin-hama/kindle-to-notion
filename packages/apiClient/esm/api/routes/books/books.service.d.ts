import { AuthenticatedUser, Env } from "../../../types/index.js";
import { CreateBookModel } from "./books.dto.js";
export declare class BooksService {
    private supabase;
    constructor(env: Env);
    createBook(newBook: CreateBookModel, user: AuthenticatedUser): Promise<any>;
}
//# sourceMappingURL=books.service.d.ts.map