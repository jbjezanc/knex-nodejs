import { onDatabaseConnect } from "./config/knex"
import {
  createAuthorWithBook,
  getLastAuthor,
} from "./operations/transactions"

const main = async () => {
  await onDatabaseConnect()

  const lastAuthor = await getLastAuthor()
  console.log(lastAuthor)

  await createAuthorWithBook()

  const newLastAuthor = await getLastAuthor()
  console.log(newLastAuthor)
}

main()
