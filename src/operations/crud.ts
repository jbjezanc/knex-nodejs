import knex from "../config/knex"

export const getAuthors = async (
  limit: number,
  offset: number
) => {
  const authors = await knex("authors")
    .limit(limit)
    .offset(offset)
    .orderBy("id", "asc")

  return authors
}

export const getBooks = async (
  limit: number,
  offset: number
) => {
  const books = await knex("books")
    .limit(limit)
    .offset(offset)
    .orderBy("price", "desc")

  return books
}

export const getAuthorById = async (id: number) => {
  const author = await knex("authors").where({ id }).first()
  return author
}

export const getBookById = async (id: number) => {
  const book = await knex("books")
    // the second way to define the WHERE clause
    .where("id", "=", id)
    .first()

  return book
}
