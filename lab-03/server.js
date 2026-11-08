
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();

app.use(express.json());

const databasePath = path.join(__dirname, "database", "books.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


// GET all books with search, sorting, pagination and price filtering.

app.get("/books/", async (request, response) => {
  try {
    const {
      search_q = "",
      order_by = "id",
      order = "ASC",
      limit = "100",
      offset = "0",
      min_price,
      max_price,
    } = request.query;

    const allowedColumns = ["id", "title", "author", "price", "pages"];

    const sortOrder = order.toUpperCase();

    if (!allowedColumns.includes(order_by)) {
      return response.status(400).send({
        message: "Invalid order_by value",
      });
    }

    if (!["ASC", "DESC"].includes(sortOrder)) {
      return response.status(400).send({
        message: "Invalid order value",
      });
    }

    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit < 1 ||
      !Number.isInteger(parsedOffset) ||
      parsedOffset < 0
    ) {
      return response.status(400).send({
        message: "Invalid limit or offset",
      });
    }

    const conditions = [];
    const values = [];

    if (search_q.trim() !== "") {
      conditions.push("title LIKE ?");
      values.push(`%${search_q.trim()}%`);
    }

    if (min_price !== undefined) {
      if (!Number.isFinite(Number(min_price))) {
        return response.status(400).send({
          message: "Invalid minimum price",
        });
      }

      conditions.push("price >= ?");
      values.push(Number(min_price));
    }

    if (max_price !== undefined) {
      if (!Number.isFinite(Number(max_price))) {
        return response.status(400).send({
          message: "Invalid maximum price",
        });
      }

      conditions.push("price <= ?");
      values.push(Number(max_price));
    }

    if (
      min_price !== undefined &&
      max_price !== undefined &&
      Number(min_price) > Number(max_price)
    ) {
      return response.status(400).send({
        message: "Minimum price cannot be greater than maximum price",
      });
    }

    let getBooksQuery = "SELECT * FROM book";

    if (conditions.length > 0) {
      getBooksQuery += " WHERE " + conditions.join(" AND ");
    }

    getBooksQuery += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?;`;

    values.push(parsedLimit, parsedOffset);

    const booksArray = await db.all(getBooksQuery, values);

    response.status(200).send(booksArray);
  } catch (error) {
    response.status(500).send({
      message: "Unable to retrieve books",
    });
  }
});


// GET a single book by ID.

app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const getBookQuery = `
      SELECT * FROM book
      WHERE id = ?;
    `;

    const book = await db.get(getBookQuery, [bookId]);

    if (book === undefined) {
      return response.status(404).send({
        message: "Book Not Found",
      });
    }

    response.status(200).send(book);
  } catch (error) {
    response.status(500).send({
      message: "Unable to retrieve book",
    });
  }
});


// POST a new book.

app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      typeof price !== "number" ||
      !Number.isFinite(price)
    ) {
      return response.status(400).send({
        message: "Title, author and numeric price are required",
      });
    }

    if (
      pages !== undefined &&
      (!Number.isInteger(pages) || pages < 0)
    ) {
      return response.status(400).send({
        message: "Pages must be a non-negative integer",
      });
    }

    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;

    const result = await db.run(addBookQuery, [
      title.trim(),
      author.trim(),
      price,
      pages ?? null,
    ]);

    response.status(201).send({
      message: "Book Added Successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    response.status(500).send({
      message: "Unable to add book",
    });
  }
});


// PUT to update a book.

app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      !Number.isInteger(pages) ||
      pages < 0
    ) {
      return response.status(400).send({
        message: "Invalid Book Details",
      });
    }

    const updateBookQuery = `
      UPDATE book
      SET title = ?,
          author = ?,
          price = ?,
          pages = ?
      WHERE id = ?;
    `;

    const result = await db.run(updateBookQuery, [
      title.trim(),
      author.trim(),
      price,
      pages,
      bookId,
    ]);

    if (result.changes === 0) {
      return response.status(404).send({
        message: "Book Not Found",
      });
    }

    response.status(200).send({
      message: "Book Updated Successfully",
    });
  } catch (error) {
    response.status(500).send({
      message: "Unable to update book",
    });
  }
});


// DELETE a book.

app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const deleteBookQuery = `
      DELETE FROM book
      WHERE id = ?;
    `;

    const result = await db.run(deleteBookQuery, [bookId]);

    if (result.changes === 0) {
      return response.status(404).send({
        message: "Book Not Found",
      });
    }

    response.status(200).send({
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    response.status(500).send({
      message: "Unable to delete book",
    });
  }
});

module.exports = app;
