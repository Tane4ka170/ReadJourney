import { createSlice } from '@reduxjs/toolkit';
import {
  addBookById,
  addNewBook,
  bookReadingInf,
  deleteBook,
  fetchBooks,
  ownBooks,
  readingDell,
  readingStart,
  readingStop,
} from './booksOperations';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    data: [],
    myBooks: [],
    loading: false,
    error: null,
    totalPages: 1,
    readBook: [],
    allInfoBook: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = [...state.myBooks, action.payload];
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBookById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = [...state.myBooks, action.payload];
      })
      .addCase(addBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ownBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ownBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = action.payload;
      })
      .addCase(ownBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = state.myBooks.filter(
          book => book._id !== action.payload.id
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(readingStart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readingStart.fulfilled, (state, action) => {
        state.loading = false;
        state.readBook = [...state.readBook, action.payload];
      })
      .addCase(readingStart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(readingStop.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readingStop.fulfilled, (state, action) => {
        state.loading = false;
        state.readBook = [...state.readBook, action.payload];
      })
      .addCase(readingStop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(readingDell.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readingDell.fulfilled, (state, action) => {
        state.loading = false;
        state.readBook = [action.payload];
      })
      .addCase(readingDell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(bookReadingInf.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookReadingInf.fulfilled, (state, action) => {
        state.loading = false;
        state.allInfoBook = action.payload;
      })
      .addCase(bookReadingInf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default bookSlice.reducer;
