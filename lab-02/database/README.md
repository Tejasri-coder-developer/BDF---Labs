The SQLite database `books.db` is included and contains 10 sample books.
The matching `books.sql` script can recreate the table and sample rows.
To run it with SQLite CLI, delete `books.db` first, then run:
sqlite3 database/books.db < database/books.sql
