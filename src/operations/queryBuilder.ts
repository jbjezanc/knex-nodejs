import knex from "../config/knex"
import { Author } from "../types"

export const getAuthorsPaginated = async (
  limit: number,
  offset: number
): Promise<{ results: Author[]; count: number }> => {
  const queryBuilder = knex("authors")
    // .select("id") // this would break the cloned query builder as it is now
    .where("name", "like", "%a%")
  // First, use the query builder to await the authors themselves
  const authors = await queryBuilder
    .limit(limit)
    .offset(offset)

  // Then, clone it to count the number of records that the original
  // query builder would return
  // If we insisted on selecting only the 'id' column in the original query builder,
  // then we would need to clear selects in this query
  const count = Number(
    (
      await queryBuilder
        .clone()
        .count()
        ./* clearSelect(). */ first()
    )?.count
  )

  return {
    results: authors,
    count,
  }
}
