import { title } from "process";

export class Songs {
       id   : number;
       title   :    string   ;
       titleAr   :    string   ;
       lowQuality   :    string  ;
       highQuality   :    string  ;
       image:string;
       albumId   : number;

       album :{
              id:number ,
              title:string,
              artistId:number
       };
       offset:number;
       limit:number;
       length:number;
       result : Songs
}