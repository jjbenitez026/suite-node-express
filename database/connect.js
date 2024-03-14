import "dotenv/config";
import pkg from 'pg';
const {Pool}=pkg;

/*CREATE TABLE nombre_tabla (
  id_user SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(15) UNIQUE,
  password VARCHAR(255) NOT NULL,
  verification_code VARCHAR(10),
  email VARCHAR(100) UNIQUE NOT NULL
);*/
export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});

try{
  await pool.query("SELECT NOW()");
  console.log("Database conected");
}catch(error){
  console.log(error)
}

