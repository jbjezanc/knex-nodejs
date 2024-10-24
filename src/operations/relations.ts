import knex from "../config/knex"

export const getBooksWithAuthorAndGenre = async () => {
  const books = await knex("books")
    .join("authors", "authors.id", "books.author_id")
    .join("genres", "genres.id", "books.genre_id")
    .select(
      "books.id",
      "books.title",
      "authors.name as author",
      "genres.name as genre"
    )
  return books
}

export const getAuthorsWithBooksCount = async () => {
  const authors = await knex("authors")
    .join("books", "books.author_id", "authors.id")
    .select(
      "authors.name",
      // Execute this query as is - i.e. don't wrap it in "" like
      // "count(books"."id)" as "books_count"
      // we bypass sql injection protection since knew wraps all the columns
      // in double quotes and that breaks our query
      knex.raw("count(books.id) as books_count")
    )
    .groupBy("authors.id") // we need only one author in each row
    .orderBy("books_count", "desc")

  return authors
}

export const getTopAuthorsWithBooksCount = async () => {
  const authors = await knex("authors")
    .join("books", "books.author_id", "authors.id")
    .select(
      "authors.name",
      knex.raw("count(books.id) as books_count")
    )
    .groupBy("authors.id") // we need only one author in each row
    .orderBy("books_count", "desc")
    .limit(5)

  return authors
}
