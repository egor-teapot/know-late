import { openDatabase, SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';
import { unlink, DocumentDirectoryPath } from 'react-native-fs';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'cards.db', location: 'default'});
};

// export const createCardsTable = async (db: SQLiteDatabase) => {
//   // create table if not exists
//   const query = `
//         CREATE TABLE IF NOT EXISTS cards (
//         hash TEXT PRIMARY KEY NOT NULL,
//         category TEXT,
//         date_of_answer TEXT NOT NULL,
//         date_of_next_answer TEXT NOT NULL,
//         level INTEGER NOT NULL,
//         title TEXT
//     );`;

//   await db.executeSql(query);
// };

export const createCardsTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const tableCards = `

    CREATE TABLE IF NOT EXISTS cards (
      hash TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      categories_name TEXT,
      FOREIGN KEY (categories_name) REFERENCES categories(name)
    );
  `
const tableCategories = `
    CREATE TABLE IF NOT EXISTS categories (
      name TEXT PRIMARY KEY NOT NULL
    );
  `
  const tableCardTimestamp = `
    CREATE TABLE IF NOT EXISTS card_timestamp (
      cards_hash TEXT NOT NULL,
      date_of_answer INT NOT NULL,
      date_of_next_answer INT NOT NULL,
      level INTEGER NOT NULL,
      FOREIGN KEY (cards_hash) REFERENCES cards(hash) ON DELETE CASCADE
    );
    `

  await db.executeSql(tableCards);
  await db.executeSql(tableCategories);
  await db.executeSql(tableCardTimestamp);

};


export const insertNewCard = async (db: SQLiteDatabase, hash: String, dateOfAnswer: String, dateOfNextAnswer: String, level: Number, title: String = "") => {
  
  const query = `
      Insert Into cards values ("${hash}", "${title}");
      Insert Into card_timestamp values ("${hash}", "${dateOfAnswer}", "${dateOfNextAnswer}", ${level});
    `;

  await db.executeSql(query);
}

export const insertInCards = async (db: SQLiteDatabase, hash: String, title: String) => {
  const query = `
      Insert Into cards values ("${hash}", "${title}", NULL);
    `

  await db.executeSql(query);
}

export const deleteFromCards = async (db: SQLiteDatabase, hash: String) => {
  await db.executeSql(`delete from cards where hash = "${hash}";`);
  await db.executeSql(`delete from card_timestamp where cards_hash = "${hash}";`);

  unlink(DocumentDirectoryPath + `/cards/${hash}.html`)
}

export const updateCardTitle = async (db: SQLiteDatabase, hash: String, title: String) => {
  const query = `
    update cards
    set title = "${title}"
    where hash = "${hash}";
  `

  await db.executeSql(query);
}

export const insertInCardTimestamp = async (db: SQLiteDatabase, hash: String, dateOfAnswer: Number, dateOfNextAnswer: Number, level: Number,) => {
  const query = `
      Insert Into card_timestamp values ("${hash}", "${dateOfAnswer}", "${dateOfNextAnswer}", ${level});
    `

  await db.executeSql(query);
}



export const updateCardTimestamp = async (db: SQLiteDatabase, hash: String, dateOfAnswer: Number, dateOfNextAnswer: Number, level: Number,) => {
  const query = `
      update card_timestamp
      set date_of_answer = ${dateOfAnswer},
      date_of_next_answer = ${dateOfNextAnswer},
      level = ${level}
      where cards_hash = "${hash}";
    `

  await db.executeSql(query);
}

export const updateCardCategory = async (db: SQLiteDatabase, hash: String, category: String) => {
  
  const query = `
    Update cards
    set categories_name = "${category}"
    Where hash = "${hash}"
  `
  
  await db.executeSql(query);
}

export const createNewCategory = async (db: SQLiteDatabase, category: String) => {
  
  const query = `
    Insert Into categories values ("${category}");
  `
  
  await db.executeSql(query);
}

export const deleteCategory = async (db: SQLiteDatabase, category: String) => {
    
  const query = `
    Delete from categories where name = "${category}";
  `
  
  await db.executeSql(query);
}

export const selectAllCards = async (db: SQLiteDatabase) => {

  const data = await db.executeSql('SELECT * FROM cards;')
    
  let obj = {}

  data.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      obj[result.rows.item(index).hash] = result.rows.item(index) 
    } 
  });
  
  return obj
}

export const selectAllFromTable = async (db: SQLiteDatabase, tableName) => {
  const data = await db.executeSql(`SELECT * FROM ${tableName};`)
  
  let arr = []

  data.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      arr.push(result.rows.item(index)) 
    } 
  });
  
  return arr
}

export const selectByColumnFromTable = async (db: SQLiteDatabase, tableName, column, value) => {
  const data = await db.executeSql(`SELECT * FROM ${tableName} where ${column} = ${value};`)
  
  let arr = []

  data.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      arr.push(result.rows.item(index)) 
    } 
  });
  
  return arr
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