import { Knex } from "knex"
import { faker } from "@faker-js/faker"
import { Book } from "../src/types"

const SEED_COUNT = 200

const createBook = (
  authors_count: number,
  genres_count: number
): Partial<Book> => ({
  title: faker.lorem.sentence(3),
  description: faker.lorem.paragraph(5),
  price: faker.number.int({ min: 1, max: 1000 }),
  author_id: faker.number.int({
    min: 1,
    max: authors_count,
  }),
  genre_id: faker.number.int({ min: 1, max: genres_count }),
})

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex("books").del()

  /**
    Get the authors count - count() returns Dict<string | number>[] type
    so we use first() on count, to select the first element of that array, leaving us with
    the Dict<string | number> | undefined
    now we can access the count property inside that object/Dict but with optional chaining, 
    on resolved Promise since there might not be authors in the table
  **/
  const authors_count = (
    await knex("authors").count().first()
  )?.count

  const genres_count = (
    await knex("genres").count().first()
  )?.count

  const books = Array.from({ length: SEED_COUNT }, () =>
    createBook(Number(authors_count), Number(genres_count))
  )

  // Inserts seed entries
  await knex("books").insert(books)
}
