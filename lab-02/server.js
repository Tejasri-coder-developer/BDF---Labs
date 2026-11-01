
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


app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book
    ORDER BY id;
  `;

  const books = await db.all(getBooksQuery);
  response.send(books);
});


app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const getBookQuery = `
    SELECT * FROM book
    WHERE id = ?;
  `;

  const book = await db.get(getBookQuery, [bookId]);

  if (book === undefined) {
    response.status(404).send({
      message: "Book Not Found",
    });
  } else {
    response.send(book);
  }
});


app.post("/books/", async (request, response) => {
  const { title, author, price, pages } = request.body;

  if (
    !title ||
    !author ||
    !Number.isInteger(price) ||
    !Number.isInteger(pages)
  ) {
    response.status(400).send({
      message: "Invalid Book Details",
    });
    return;
  }

  const addBookQuery = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?);
  `;

  await db.run(addBookQuery, [
    title,
    author,
    price,
    pages,
  ]);

  response.send({
    message: "Book Added Successfully",
  });
});


app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  if (
    !title ||
    !author ||
    !Number.isInteger(price) ||
    !Number.isInteger(pages)
  ) {
    response.status(400).send({
      message: "Invalid Book Details",
    });
    return;
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
    title,
    author,
    price,
    pages,
    bookId,
  ]);

  if (result.changes === 0) {
    response.status(404).send({
      message: "Book Not Found",
    });
  } else {
    response.send({
      message: "Book Updated Successfully",
    });
  }
});


app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const deleteBookQuery = `
    DELETE FROM book
    WHERE id = ?;
  `;

  const result = await db.run(deleteBookQuery, [bookId]);

  if (result.changes === 0) {
    response.status(404).send({
      message: "Book Not Found",
    });
  } else {
    response.send({
      message: "Book Deleted Successfully",
    });
  }
});

module.exports = app;
