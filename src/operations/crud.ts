import knex from "../config/knex"
import { Author, Book } from "../types"

/********* READ OPERATIONS **********/

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

export const getGenreById = async (id: number) => {
  const genre = await knex("genres").where({ id }).first()
  return genre
}

export const createAuthor = async (
  body: Partial<Author>
) => {
  const author = await knex("authors").insert(body, "*")
  // .insert(body, ["id", "name"])
  return author[0]
}

export const createBook = async (body: Partial<Book>) => {
  await checkAuthorExists(body.author_id)
  await checkGenreExists(body.genre_id)
  const book = await knex("books").insert(body, "*")
  return book[0]
}

/********* UPDATE OPERATIONS **********/

export const updateAuthor = async (
  id: number,
  body: Partial<Author>
) => {
  await checkAuthorExists(id)
  const author = await knex("authors")
    .where({ id })
    .update(body, "*")

  return author[0]
}

export const updateBook = async (
  id: number,
  body: Partial<Book>
) => {
  if (body.author_id) {
    await checkAuthorExists(body.author_id)
  }
  if (body.genre_id) {
    await checkGenreExists(body.genre_id)
  }
  const book = await knex("books")
    .where({ id })
    .update(body, "*")

  return book[0]
}

/********* DELETE OPERATIONS **********/

export const removeBook = async (id: number) => {
  await checkBookExists(id)
  await knex("books").where({ id }).delete()
  return true
}

export const removeAuthor = async (id: number) => {
  await checkAuthorExists(id)
  const booksCount = (
    await knex("books")
      .where({
        author_id: id,
      })
      .count()
      .first()
  )?.count

  if (Number(booksCount) > 0) {
    throw new Error(
      "This author has books, thus cannot be deleted"
    )
  }
  await knex("authors").where({ id }).delete()
  return true
}

/********* VALIDATION OPERATIONS **********/

export const checkAuthorExists = async (id?: number) => {
  if (!id) throw new Error("Author ID is required")
  const author = await getAuthorById(id)
  if (!author) {
    throw new Error("The Author ID is invalid")
  }
}

export const checkGenreExists = async (id?: number) => {
  if (!id) throw new Error("Genre ID is required")
  const genre = await getGenreById(id)
  if (!genre) {
    throw new Error("The Genre ID is invalid")
  }
}

export const checkBookExists = async (id?: number) => {
  if (!id) throw new Error("Book ID is required")
  const book = await getBookById(id)
  if (!book) {
    throw new Error("The Book ID is invalid")
  }
}
