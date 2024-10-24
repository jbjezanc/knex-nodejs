import { onDatabaseConnect } from "./config/knex"
import { getTopAuthorsWithBooksCount } from "./operations/relations"

const main = async () => {
  await onDatabaseConnect()

  const topFiveAuthors = await getTopAuthorsWithBooksCount()
  console.log(topFiveAuthors)
}

main()
