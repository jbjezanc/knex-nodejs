import { onDatabaseConnect } from "./config/knex"

onDatabaseConnect()
  .then(() => console.log("Database is connected"))
  .catch((error) => console.error(error))
