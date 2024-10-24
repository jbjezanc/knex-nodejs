import knex from "../config/knex"
import { Author } from "../types"

// A pagination query with total results for frontend page navigation
// This is a rather necessary N+1 query (which are bad btw)
export const getAuthorsPaginated = async (
  limit: number,
  offset: number
): Promise<{ results: Author[]; count: number }> => {
  const authors = await knex("authors")
    .limit(limit)
    .offset(offset)
  const count = Number(
    (await knex("authors").count().first())?.count
  )

  return {
    results: authors,
    count,
  }
}
