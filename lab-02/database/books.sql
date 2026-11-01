CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    price INTEGER,
    pages INTEGER
);

INSERT INTO book (title, author, price, pages) VALUES
('The Alchemist', 'Paulo Coelho', 350, 208),
('Wings of Fire', 'A. P. J. Abdul Kalam', 280, 180),
('Atomic Habits', 'James Clear', 499, 320),
('The Hobbit', 'J. R. R. Tolkien', 450, 310),
('Ikigai', 'Hector Garcia', 399, 208),
('Deep Work', 'Cal Newport', 420, 296),
('1984', 'George Orwell', 299, 328),
('Pride and Prejudice', 'Jane Austen', 250, 432),
('The Guide', 'R. K. Narayan', 320, 220),
('Malgudi Days', 'R. K. Narayan', 275, 256);
