const authors = [
    {
        name: "Robert Martin",
        born: 1952,
        bookCount: 2,
    },
    {
        name: "Martin Fowler",
        born: 1963,
        bookCount: 1,
    },
    {
        name: "Fyodor Dostoevsky",
        born: 1821,
        bookCount: 2,
    },
    {
        name: "Joshua Kerievsky", // birthyear not known
        bookCount: 1,
    },
    {
        name: "Sandi Metz", // birthyear not known
        bookCount: 1,
    },
];

const books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        genres: ["refactoring"],
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        genres: ["agile", "patterns", "design"],
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        genres: ["refactoring"],
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        genres: ["refactoring", "patterns"],
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        genres: ["refactoring", "design"],
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        genres: ["classic", "crime"],
    },
    {
        title: "The Demon ",
        published: 1872,
        author: "Fyodor Dostoevsky",
        genres: ["classic", "revolution"],
    },
];

module.exports = { authors, books };
