import { Artist } from "./artist.model";
export class Album {
  constructor(){
    this.isFeatured = false;
  }

  id : number; 
  title :  string ;
  titleAr :  string ;
  image :  any ;
  extension:string;
  artistId:number;
  artist: Artist
  languageId:number;
 // language:Language
  albumCategoryId:number;
 // albumCategory: Categories
  realeaseDate :  string;
  isFeatured : boolean 
}