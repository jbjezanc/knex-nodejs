import { onDatabaseConnect } from "./config/knex"
import {
  // createAuthor,
  // updateAuthor,
  // createBook,
  updateBook,
} from "./operations/crud"

const main = async () => {
  await onDatabaseConnect()

  // const newAuthor = await createAuthor({
  //   name: "Another Author",
  //   bio: "His Latest",
  // })
  // console.log(newAuthor.id) // 111

  // const updatedAuthor = await updateAuthor(111, {
  //   name: "Another Author Updated",
  //   bio: "Update Bio ",
  // })

  // const book = await createBook({
  //   title: "New Book",
  //   description: "This is a new book",
  //   price: 45,
  //   author_id: 111,
  //   genre_id: 10,
  // })

  // console.log(book) // id: 207

  const updatedBook = await updateBook(207, {
    title: "New Book Updated",
    description: "This is a new book updated",
    price: 11,
    author_id: 99,
    genre_id: 9,
  })

  console.log(updatedBook)
}

main()
