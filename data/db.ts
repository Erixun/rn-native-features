import * as SQLite from 'expo-sqlite';
import { Place } from '../models/Place';
import { ResultSet, ResultSetError } from 'expo-sqlite';

export const db = SQLite.openDatabase('places.db'); //will be created for us if it does not exist

export const initDb = async () => {
  let didSucceed = false;
  await db.transactionAsync(async (transaction) => {
    transaction
      .executeSqlAsync(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        []
      )
      .then(success)
      .catch(error);
  });
  return didSucceed;

  function success() {
    console.log('Database successfully initialized');
    didSucceed = true;
  }
  function error() {
    console.log('Failed to initialize database');
    didSucceed = false;
  }
};

export const insertData = (data: Place) => {
  const { title, imageUri, address, location } = data;
  db.transactionAsync(async (tx) => {
    tx.executeSqlAsync(
      'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
      [title, imageUri, address, location.lat, location.lng]
    )
      .then((results) => {
        checkErr(results);
        console.log('Successfully inserted', results);
      })
      .catch((err) => {
        console.log('Failed to insert data for', title);
        console.log(err.message);
      });
  });
};

export const retrieveData = async () => {
  let data = new Array<Place>();
  await db.transactionAsync(async (tx) => {
    tx.executeSqlAsync('SELECT * FROM places', [])
      .then((results) => {
        checkErr(results);
        console.log('Successfully retrieved places', results);
        data = results.rows as Place[];
      })
      .catch((err) => {
        console.log('Failed to retrieve places data');
      });
  });
  return data;
};

const checkErr = (results: Partial<ResultSet & ResultSetError>) => {
  if (results.error) {
    const { message, stack, cause } = results.error;
    console.error(stack);
    throw new Error(message, { cause: cause });
  }
};
