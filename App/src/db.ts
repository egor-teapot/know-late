import { openDatabase, SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'cards.db', location: 'default'});
};

export const createCardsTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `
        CREATE TABLE IF NOT EXISTS cards (
        hash TEXT PRIMARY KEY NOT NULL,
        category TEXT,
        date_of_answer TEXT NOT NULL,
        date_of_next_answer TEXT NOT NULL,
        level INTEGER NOT NULL,
        title TEXT
    );`;

  await db.executeSql(query);
};


export const insertNewCard = async (db: SQLiteDatabase, hash: String, category: String = "", dateOfAnswer: String, dateOfNextAnswer: String, level: Number, title: String = "") => {
  const query = `Insert Into cards values ("${hash}", "${category}", "${dateOfAnswer}", "${dateOfNextAnswer}", ${level}, "${title}");`;

  await db.executeSql(query);
}

export const selectAllCards = async (db: SQLiteDatabase) => {

  const data = await db.executeSql('SELECT * FROM cards;')
  
  // let some = []<Object>
  // (await data).forEach(result => {
  //     for (let I = 0; I < result.rows.length; I++) {
  //       some.push(result.rows.item(I))
  //     }
  //   });
    
  let obj = {}

  data.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      obj[result.rows.item(index).hash] = result.rows.item(index) 
    } 
  });
  
  return obj
}

export const selectAllCardsArray = async (db: SQLiteDatabase) => {

  const data = await db.executeSql('SELECT * FROM cards;')
  
  let arr = []

  data.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      arr.push(result.rows.item(index)) 
    } 
  });
  
  return arr
}