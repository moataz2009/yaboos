import { title } from "process";

export class Songs {
       id   : number;
       title   :    string   ;
       duration   :    any   ;
       titleAr   :    string   ;
       lowQuality   :    string  ;
       highQuality   :    string  ;
       image:string;
       albumId   : number;
       isFavourite: any;
       album :{
              id:number ,
              title:string,
              artistId:number,
              image: any,
              artist: {
                     image: any;
              }
       };
       offset:number;
       limit:number;
       length:number;
       result : Songs;
}