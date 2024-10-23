import { Knex } from "knex"
import { faker } from "@faker-js/faker"
import { Author } from "../src/types"

const SEED_COUNT = 100

const createAuthor = (): Partial<Author> => ({
  name: faker.person.fullName(),
  bio: faker.lorem.paragraph(),
})

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex("authors").del()

  // Inserts seed entries
  const authors = Array.from(
    { length: SEED_COUNT },
    createAuthor
  )
  // or:
  // const authors = Array(SEED_COUNT).fill(null).map(createAuthor)
  await knex("authors").insert(authors)
}
