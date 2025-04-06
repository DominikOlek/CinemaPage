
export default interface MovieI {
    ID: number,
    Name: string,
    Director: string,
    Describe: string,
    CategoryID: number,
    AgeCategory: string,
    Length: number,
    ImageSrc: string,
    Is3D: boolean,
    IsIMAX: boolean,
    Is4D: boolean,
    IsScreenX: boolean,
    LanguageName: string[],
    SubtitlesName: string[],
    InstID: number[],
    Category: string
}