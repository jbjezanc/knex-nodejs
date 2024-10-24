import { onDatabaseConnect } from "./config/knex"
import { getTopAuthorsWithBooksCount } from "./operations/relations"

const main = async () => {
  await onDatabaseConnect()
  // const books = await getBooksWithAuthorAndGenre()
  // console.log(books)

  // const authors = await getAuthorsWithBooksCount()
  // console.log(authors)

  const topFiveAuthors = await getTopAuthorsWithBooksCount()
  console.log(topFiveAuthors)
}

main()
