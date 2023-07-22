import * as SQLite from 'expo-sqlite';
import { Place } from '../models/Place';
import { ResultSet, ResultSetError } from 'expo-sqlite';
import { LatLng } from '../utils/location';

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

export const insertPlace = async (input: Place) => {
  const { title, imageUri, address, location } = input;
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

export const retrievePlaces = async () => {
  let output = new Array<Place>();
  await db.transactionAsync(async (tx) => {
    tx.executeSqlAsync('SELECT * FROM places', [])
      .then((results) => {
        checkErr(results);
        console.log('Successfully retrieved places', results);
        output = results.rows as Place[];
      })
      .catch((err) => {
        console.log('Failed to retrieve places data');
      });
  });
  return output;
};

export const getPlaceDetails = async (id: string) => {
  let output: Place | undefined;
  await db.transactionAsync(async (tx) => {
    tx.executeSqlAsync(`SELECT * FROM places WHERE id = ?`, [id])
      .then((results) => {
        checkErr(results);
        const { lat, lng, address, title, id, imageUri } = results
          .rows[0] as Omit<Place, 'location'> & LatLng;
        const location = { lat, lng };
        output = new Place(title, imageUri, address, location, id);
      })
      .catch((err) => {
        console.log(`Failed to retrieve details for place with id`, id);
      });
  });

  return output;
};

const checkErr = (results: Partial<ResultSet & ResultSetError>) => {
  if (results.error) {
    const { message, stack, cause } = results.error;
    console.error(stack);
    throw new Error(message, { cause: cause });
  }
};
