import RNFS from 'react-native-fs2'

// Путь к внутреннему хранилищю приложения 
export const STORAGE:string = String(RNFS.ExternalDirectoryPath + "/")

// создает папку для хранения карточек
export const initFS = () => {
    RNFS.mkdir(STORAGE + "/cards")
}

// Воводит список элементов в указанной папке
export const listFolderElements = (path:string = "") => {
    return RNFS.readDir(STORAGE + `${path}`)
}

// читает файл
export const readFile = (name:string) => {
    return RNFS.readFile(STORAGE + `/${name}`) // может читать utf8
}

// создает файл
export const createFile = (path:string, name:string, data:string) => {
    RNFS.writeFile(path + `/${name}`, data)
}