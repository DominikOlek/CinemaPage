
export default interface AddMovieI {
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
    Languages: number[],
    Subtitles: number[],
    InstID: number[],
    Category: string
}