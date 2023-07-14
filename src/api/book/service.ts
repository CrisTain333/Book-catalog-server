import { Book } from '../../model/Book';
import { IBook } from './interface';

const getAllBooksFromDb = async (): Promise<IBook[] | null> => {
    const result = await Book.find({});
    return result;
};

const addBookToDb = async (payload: IBook): Promise<IBook | null> => {
    const result = await Book.create(payload);
    return result;
};

const deleteBookFromDb = async (bookId: string) => {
    const result = await Book.deleteOne({ _id: bookId });

    return result;
};

export const BookService = {
    getAllBooksFromDb,
    addBookToDb,
    deleteBookFromDb
};
