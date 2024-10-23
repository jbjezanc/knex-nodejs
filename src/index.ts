import { onDatabaseConnect } from "./config/knex"
import {
  getAuthorById,
  getAuthors,
  getBookById,
  getBooks,
} from "./operations/crud"

const main = async () => {
  await onDatabaseConnect()
  // const authors = await getAllAuthors(2, 0)
  // skip the first two, return the two
  const authors = await getAuthors(2, 2)
  const books = await getBooks(2, 0)
  const author = await getAuthorById(1)
  const book = await getBookById(1)
  console.log(authors)
  console.log(books)
  console.log(author)
  console.log(book)
}

main()
