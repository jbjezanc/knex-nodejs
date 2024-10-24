import knex from "../config/knex"
import { Author } from "../types"

export const getLastAuthor = async () => {
  const author = await knex("authors")
    .orderBy("created_at", "desc")
    .first()

  return author
}

// a transaction function
export const createAuthorWithBook = async () => {
  try {
    await knex.transaction(async (trx) => {
      const author: Author = (
        await trx("authors").insert(
          {
            name: "Transaction Author",
            bio: "Transaction Author's Bio",
          },
          "*"
        )
      )[0]
      await trx("books").insert(
        {
          title: "New Transaction Book",
          author_id: author.id,
          price: 989,
          genre_id: 1,
        },
        "*"
      )
    })
    console.log("New Author with Book created")
  } catch {
    console.error('DB Transaction Error')
  }
}

// To rollback a transaction due to some business logic error,
// we have an option to do it manually, with: trx.rollback()