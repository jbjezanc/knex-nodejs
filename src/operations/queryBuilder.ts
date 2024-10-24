import knex from "../config/knex"
import { Author } from "../types"

export const getAuthorsPaginated = async (
  limit: number,
  offset: number
): Promise<{
  results: Partial<Author>[]
  count: number
}> => {
  const queryBuilder = knex("authors")
    .select("id")
    .where("name", "like", "%a%")

  const authors = await queryBuilder
    .limit(limit)
    .offset(offset)

  const count = Number(
    (
      await queryBuilder
        .clone()
        .clearSelect()
        .count()
        .first()
    )?.count
  )

  return {
    results: authors,
    count,
  }
}
