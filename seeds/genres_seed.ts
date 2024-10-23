import { Knex } from "knex"
import { faker } from "@faker-js/faker"

const SEED_COUNT = 10

const createGenre = () => ({
  name: faker.lorem.words(2),
})

export async function seed(knex: Knex): Promise<void> {
  const genres = Array.from(
    { length: SEED_COUNT },
    createGenre
  )
  // Deletes ALL existing entries
  await knex("genres").del()
  // Inserts seed entries
  await knex("genres").insert(genres)
}
