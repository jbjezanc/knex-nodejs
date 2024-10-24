import { onDatabaseConnect } from "./config/knex"
import { removeAuthor } from "./operations/crud"

const main = async () => {
  await onDatabaseConnect()
  await removeAuthor(99)
}

main()
