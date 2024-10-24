import knex from "../config/knex"
import { Author } from "../types"

// A pagination query with total results for frontend page navigation
// This is a rather necessary N+1 query (which are bad btw)
export const getAuthorsPaginated = async (
  limit: number,
  offset: number
): Promise<{ results: Author[]; count: number }> => {
  // the type of this constant is a Knex.QueryBuilder<..,..>
  const queryBuilder = knex("authors")
  // so we can build on top of it
  queryBuilder.limit(limit)
  queryBuilder.offset(offset)

  // cloning the queryBuilder will not affect the original query
  const queryBuilderTwo = queryBuilder.clone()
  queryBuilderTwo.where('id', 10)
  // we can clear some statements added by the original queryBuilder
  queryBuilderTwo.clearSelect()
  // we can clear count statements
  queryBuilderTwo.clearCounters()
  // we can clear groupBy statements
  queryBuilderTwo.clearGroup()

  // finally, we can execute the queryBuilderTwo
  const result = await queryBuilderTwo

  const authors = await queryBuilder
  const count = Number(
    (await knex("authors").count().first())?.count
  )

  return {
    results: authors,
    count,
  }
}
