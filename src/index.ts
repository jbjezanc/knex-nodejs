import { onDatabaseConnect } from "./config/knex"
import { createAuthor, createBook } from "./operations/crud"

const main = async () => {
  await onDatabaseConnect()

  // const author = await createAuthor({
  //   name: "Test Author",
  //   bio: "Test Bio",
  // })
  const book = await createBook({
    title: "Test Book Title 2",
    description: "Test Book Description 2",
    price: 100,
    author_id: 6,
    genre_id: 4,
  })
  console.log(book)
}

main()
