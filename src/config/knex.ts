/* Load .env variables */
import "dotenv/config"
import Knex from "knex"

/* Destruct all required parameters from process.env loaded by dotenv */
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env

/* Create a Knex instance to postgresql database with the connection details */
const knex = Knex({
  client: "postgresql",
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  /* We need minimum 2 and at most 10 connections */
  pool: {
    min: 2,
    max: 10,
  },
})

/* Test the db connection by returning 1 if it works */
export const onDatabaseConnect = async () =>
  knex.raw("SELECT 1")

/* Export our knex instance */
export default knex;
