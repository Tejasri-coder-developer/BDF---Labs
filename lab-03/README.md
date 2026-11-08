# Lab 3: REST API, query parameters, validation, debugging

**Name:** Marthala Venkata Tejasri 
**Registration Number:** 252U1R7062
**Section:** CSE - FSD - 2B (309)
**Lab Number:** 3

## Live link
Not deployed - because I got some error in render because of some login of git Hub and something sir.


## A Main Note:  In Lab 2 I have removed the book of id 5 so that is not available here in lab 3.



## Description
This project extends the Lab 2 Books API with title search, sorting, pagination, price filtering, request validation, and consistent HTTP status codes.

## Installation
```bash
npm install
```

## Run
```bash
npm run dev
```

The server runs locally at `http://localhost:3000`.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/books/` | List books with search, sort, pagination, and price filters |
| GET | `/books/:bookId/` | Get one book by ID |
| POST | `/books/` | Create a book; returns 201 when successful |
| PUT | `/books/:bookId/` | Update a book; returns 200 or 404 |
| DELETE | `/books/:bookId/` | Delete a book; returns 200 or 404 |

### GET `/books/` query parameters

| Parameter | Default | Description |
|---|---|---|
| `search_q` | empty | Partial title search |
| `order_by` | `id` | Sort column: `id`, `title`, `author`, `price`, or `pages` |
| `order` | `ASC` | Sort direction: `ASC` or `DESC` |
| `limit` | `10` | Maximum number of rows |
| `offset` | `0` | Number of rows to skip |
| `min_price` | none | Minimum price, inclusive |
| `max_price` | none | Maximum price, inclusive |

Example: `http://localhost:3000/books/?search_q=Alchemist&order_by=price&order=DESC&limit=5&offset=0&min_price=100&max_price=500`

## Database
The supplied `database/books.db` is copied from the user's Lab 2 database. Its contents are preserved.

## Screenshots - see here or click here


## To get all books 
![Get All Books](./screenshots/GET-ALL-BOOKS-1.png)
![Get All Books](./screenshots/GET-ALL-BOOKS-2.png)
![Get All Books](./screenshots/GET-ALL-BOOKS-3.png)


## To get book by Id
![Get A Book](./screenshots/GET-A-BOOK-1.png)
![Get A Book](./screenshots/GET-A-BOOK-2.png)

## Search Book by word
![Search Book](./screenshots/SEARCH-BOOK-1.png)
![Search Book](./screenshots/SEARCH-BOOK-2.png)

## Sorting Book by Price
![Sort Book](./screenshots/SORT-BOOK-1.png)
![Sort Book](./screenshots/SORT-BOOK-2.png)

## Sorting Book by Title
![Sort Book](./screenshots/SORT-A-BOOK-1.png)
![Sort Book](./screenshots/SORT-A-BOOK-2.png)

## Limit 
![Limit](./screenshots/LIMIT-1.png)
![Limit](./screenshots/LIMIT-2.png)


## Pagination
![Pagination](./screenshots/PAGINATION-1.png)
![Pagination](./screenshots/PAGINATION-2.png)

## Filter Books By Min Price
![Filter](./screenshots/FILTER-BY-MIN-PRICE-1.png)
![Filter](./screenshots/FILTER-BY-MIN-PRICE-2.png)

## Filter Books By Max Price
![Filter](./screenshots/FILTER-BY-MAX-PRICE-1.png)
![Filter](./screenshots/FILTER-BY-MAX-PRICE-2.png)

## Filter Books By Price Range
![Filter](./screenshots/FILTER-BY-PRICE-RANGE-1.png)
![Filter](./screenshots/FILTER-BY-PRICE-RANGE-2.png)

## Combination 
![Combination](./screenshots/COMBINATION-2.png)
![Combination](./screenshots/COMBINATION-2.png)

## Add a new book
![Add Book](./screenshots/ADD-BOOK-1.png)


## Add book with Missing title 
![Add Book](./screenshots/ADD-BOOK-2.png)



## Add Book with missing price
![Add Book](./screenshots/ADD-BOOK-3.png)



## Update A Book
![Update Book](./screenshots/UPDATE-BOOK-1.png)


## Request a book ID that does not exist
![Request Book](./screenshots/REQUEST-1.png)


## Delete a book
![Delete Book](./screenshots/DELETE-BOOK-1.png)


## Delete a book ID that does not exist
![Delete Book](./screenshots/DELETE-BOOK-2.png)



## Debugging practice
Practised and identified and correcting the four issues listed in the Lab 3 handout: port conflict (`EADDRINUSE`), wrong import path, table-name typo (`no such table`), and missing `await`.



