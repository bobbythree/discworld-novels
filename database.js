import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({  
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database
}).promise()

export async function getBooks() {
  const result = await pool.query('SELECT * FROM books');
  const rows = result[0];
  return rows;
}

export async function getBook(id) {
  const result = await pool.query(`
  SELECT * FROM books
  WHERE id = ?
  `, [id]);
  const rows = result[0];
  return rows[0];
}

export async function getTitlesAndSubseries() {
  const result = await pool.query(
    `SELECT books.title, subseries.subseries FROM books
      INNER JOIN subseries
      ON books.subseriesID = subseries.id`
  )
  const rows = result[0];
  return rows;
}
