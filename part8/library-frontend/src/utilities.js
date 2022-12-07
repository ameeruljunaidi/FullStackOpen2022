export const updateBookCache = (cache, query, addedBook) => {
    const uniqByTitle = books => {
        let seen = new Set();
        return books.filter(book => {
            let k = book.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    if (!cache.readQuery(query)) return;

    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
        };
    });
};

export const updateGenreCache = (cache, query, genre) => {
    const genresInCache = cache.readQuery(query);
    if (genresInCache.allGenres.includes(item => item === genre)) return;

    cache.updateQuery(query, ({ allGenres }) => {
        return { allGenres: allGenres.concat(genre) };
    });
};
