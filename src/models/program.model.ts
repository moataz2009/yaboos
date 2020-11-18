import { Artist } from "./artist.model";
import { Songs } from "./songs.model";


export class program {
    id:number;
    title:string;
    titleAr:string;
    image:string;
    artistId :number;
    artist :Artist;
    songs : Songs[];
    descriptionAr : string;
    description:string;
    langId : number;
    extension:string;
}
export class programsApiData{
    offset:number;
    limit:number;
    length:number;
    result:program[]=[];
}

