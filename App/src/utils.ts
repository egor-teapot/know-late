import { editorState } from "../App"
import { insertInCardTimestamp, insertInCards, updateCardTitle } from "./db"
import { writeFile, DocumentDirectoryPath } from "react-native-fs"
import { CardEditorHTML } from "./components/CardEditorHTML"

export const calculateDateOfNextAnswer = (inputDate, level=1) => {
    let dateOfNextAnswer
    let daysAddition
    let parsedDate 

    parsedDate = new Date(inputDate)

    if(level == 1) daysAddition = 1;
    if(level == 2) daysAddition = 2;
    if(level == 3) daysAddition = 4;
    if(level == 4) daysAddition = 7;

    dateOfNextAnswer = new Date (parsedDate.setDate((parsedDate.getDate() * daysAddition) + 1))

    return dateOfNextAnswer.getTime()
}

export const checkAwaitingCards = async (db) => {
  const data = await db.executeSql(`
    SELECT cards_hash from card_timestamp
    where strftime('%s','now') >= CAST(date_of_next_answer as text);
  `)

  let arr = []

  data.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      arr.push(result.rows.item(index)["cards_hash"]) 
    } 
  });

  return arr
}

export const increaseLevelOfCard = (level) => {
    if (level == 4) return level

    return level + 1
}

export const decreaseLevelOfCard = (level) => {
    if (level == 1) return level

    return level - 1
}

export const createNewCard = async (db) => {  
  const randomDigitByLength = (diginLength: Number) => {
    let emptyString = ""
    
    for (let i = 0; i < diginLength; i++) {
      emptyString += Math.floor(Math.random() * 9)
    }

    return emptyString
  } // randomDigitByLength
  const id = randomDigitByLength(16)
  let level = 1

  insertInCards(db, id, editorState.header)
  updateCardTitle(db, id, editorState.header)
  await insertInCardTimestamp(db, id, Date.now(), calculateDateOfNextAnswer(Date.now(), level), level)

  await writeFile(DocumentDirectoryPath + `/cards/${id}.html`, CardEditorHTML(editorState.header, editorState.front, editorState.back), "utf8")

  editorState.case = "edit"
};

export const editCard = async (db) => {

  updateCardTitle(db, editorState.hash, editorState.header)
  await writeFile(DocumentDirectoryPath + `/cards/${editorState.hash}.html`, CardEditorHTML(editorState.header, editorState.front, editorState.back), "utf8")
};