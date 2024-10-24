import { onDatabaseConnect } from "./config/knex"
import { getAuthorsPaginated } from "./operations/queryBuilder"

const main = async () => {
  await onDatabaseConnect()

  const authors = await getAuthorsPaginated(10, 0)
  console.log(authors)
}

main()
