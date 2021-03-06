import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery'
import { Artist } from 'src/models/artist.model';
import { Songs } from 'src/models/songs.model';
import { ArtistService } from 'src/service/artist.service';
import { SongsService } from 'src/service/songs.service';
import { AlbumService } from 'src/service/album.service';
import { Album } from 'src/models/abum.model';
import { FavoritesService } from 'src/app/shared/favorites.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  
  [x: string]: any;
  headerMessage : string;
  showSongs:boolean = true;
  showAlbums:boolean = false;
  showArtists:boolean = false;
  isPlaying: boolean = false;
  showanotherheart: boolean = false;
  hideheart: boolean = true;
  searchText:string;
  artistList: Artist[];
  songsList: Songs[] = [];
  songsalbumsList: Songs[];
  songsalbumsData: Songs[];
  albumList : any;
  myonealbumsong :  Album[];
  currentSongURL : any;
  currentSongName:any;
  currentSongId:any;
  songPlayIcon:boolean = false;

  count = 10;
  mycountalb:any = 9;
  pagination:any = 0;
  paginationSong:any = 0;

  moresongs:boolean = true;
  morealbums:boolean = true;
  moreartist:boolean = true;
  morealbsong:boolean = true;
  isLogin:boolean;

  SelectesAlbumID:any;
  AlbumSongsOffcet = 9;  

  isLoading: boolean = true;

  constructor( 
    private Aroute: ActivatedRoute,
    private router: Router , 
    private ArtistService: ArtistService , 
    private SongsService : SongsService ,
    private AlbumService : AlbumService ,
    private favorites : FavoritesService,
    private toastr: ToastrService,
    private playerUrl : PlayerService
    ) { }

    /**
     * 
     * Moataz Code Final
     */
    PlayTrack(id: any, title, image, status, isFavorite, index ){
      if(status === false){
        this.PlayUrlTrack = `http://188.225.184.108:9091/api/songs/playsong/${id}`;
        
        this.playerUrl.changeUrlPlayer(this.PlayUrlTrack);
        this.playerUrl.changePlayerStatus(true);
        this.playerUrl.changePlayerTitle(title);
        this.playerUrl.actionPlayNow("");
        this.playerUrl.actionIsFavorite(isFavorite);
        this.playerUrl.actionSongId(id);
        this.playerUrl.actionPlayerType("track");
        this.playerUrl.actionPlayImage(image);

        // indexs
      this.playerUrl.ActionPlayList(this.songsList);
      this.playerUrl.ActionPlayerIndex(index);

      }else{
        this.playerUrl.ngStop()
        this.playerUrl.changePlayerStatus(false);
        this.playerUrl.changePlayerTitle(title);
      }
    }

    deleteFromFavorite(SongId: String,index){
      this.favorites.deleteFromFavorite(SongId).subscribe((data: any) => {
        
        this.toastr.success('تم الحذف بنجاح');
       this.songsList[index].isFavourite = false;
  
  
      }, (err: HttpErrorResponse) => {
        if(localStorage.getItem('userToken') != null){
        }else{
           this.router.navigate(['/login']);
           return false;
        }
        this.toastr.error('لم يتم الحذف ');
  
      });
    }
  
    addToFavorite(SongId: String, index){
      this.favorites.addToFavorite(SongId).subscribe((data) => {  

        this.toastr.success('تم الحفظ بنجاح');
       this.songsList[index].isFavourite = true;

      }, (err: HttpErrorResponse) => {
        if(localStorage.getItem('userToken') != null){
        }else{
           this.router.navigate(['/login']);
           return false;
        }
        this.toastr.success('لم يتم الحفظ ');
      });
    }

    /**
     * 
     * Moataz Final Code Ended 
     */


  fillHeader(message , url)
  {
    this.IsMobileHeader = true;
    this.headerMessage =message;
    this.mobileAppUrl =url;
  }
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;
      // Windows Phone must come first because its UA also contains "Android"
      if (/android/i.test(userAgent)) {
        this.mobileAppUrl="https://play.google.com/";
        this.fillHeader("Get Yaboos  Mobile App" ,  this.mobileAppUrl);
          return "Android";

      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
     else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
     this.mobileAppUrl="https://www.apple.com/lae/ios/app-store/";
      this.fillHeader("Get Yaboos  Mobile App" ,  this.mobileAppUrl);
          return "iOS";
      }
      else{
        // this.mobileAppUrl="https://play.anghami.com/";
        // this.fillHeader("Get Yaboos ios Mobile App" ,  this.mobileAppUrl);
        return "PC";
      }
  
     
  }


  opensongsection(){
    this.showSongs = true;
    this.showAlbums = false;
    this.showArtists = false;
  }

  openalbumsection(){
    this.showSongs = false;
    this.showAlbums = true;
    this.showArtists =false;
  }

  openartistsection(){
    this.showSongs = false;
    this.showAlbums = false;
    this.showArtists = true;
  }

//  
openmusicmodel(songId , name){
  var audio= document.querySelector("audio");
  audio.pause();
  this.isPlaying= true;
  this.currentSongURL =`http://188.225.184.108:9091/api/songs/playsong/${songId}`;
  this.currentSongId = songId;
  this.currentSongName = name;
  this.mainicon = false;
  this.songPlayIcon = true;
}
ChangeIcons()
{
  this.mainicon = ! this.mainicon;
  this.songPlayIcon = ! this.songPlayIcon;
  if(this.songPlayIcon)
  {
    var audio= document.querySelector("audio");
    audio.play();
  }
  else{
    var audio= document.querySelector("audio");
    audio.pause();
  }
}

nextSong(){

var currentSongIndex = this.songsList.indexOf(this.songsList.find(item => item.id ===  this.currentSongId));
if(currentSongIndex == this.songsList.length-1)
{

}
else{
  var nextSongIndex = this.songsList.indexOf(this.songsList.find(item => item.id ===  this.currentSongId))+1;
  var nextSong =  this.songsList[nextSongIndex];
  this.openmusicmodel(nextSong.id , nextSong.title);
}

}
prevSong(){
var currentSongIndex = this.songsList.indexOf(this.songsList.find(item => item.id ===  this.currentSongId));
if(currentSongIndex == this.songsList.length - this.songsList.length -1)
{

}
else{
  var prevSongIndex = this.songsList.indexOf(this.songsList.find(item => item.id ===  this.currentSongId))-1;
var prevSong =  this.songsList[prevSongIndex];
this.openmusicmodel(prevSong.id , prevSong.title);
}
}
closeMedia() {
  this.isPlaying= false;
}

like(){
  
  this.showanotherheart= true;
  this.hideheart= false;
}


//plyed icon
thisicon:boolean=false;
mainicon:boolean=true;
showsongalertlib:boolean=false;
showanothericon(){
  this.thisicon=true;
  this.mainicon=false;
}
showamainicon(){
  this.thisicon=false;
  this.mainicon=true;
}
showminiwindow(){
  this.isPlaying= false;
  this.showsongalertlib=true;
}
showwindowofplaying(){
  this.isPlaying= true;
  this.showsongalertlib=false;
}
showmodalhere(){
  this.isPlaying=true;
  this.hideshow=false;
}
showminiwindow2(){
  this.isPlaying=false;
  this.hideshow=true;
}

hidenow:boolean=false;
hidelate:boolean=true;

myhello(){
  this.hidenow=true;
  this.hidelate=false;
  $('#songplayer').css("display","none");
  $('.firstimage').css("display","none");
  // $('.secondModal').css("width","90%");
  $('.secondModal').css("top","78%");

  if(($(window).width() <= 319)){
    $('.secondModal .navigation a').css("font-size","15px");
    $('.secondModal .navigation .secondimage').css("width","59px");
  }
  if(($(window).width() <= 575.98)){
    $('.secondModal').css("top","70%");
  }
  if(($(window).width() >= 575.99)&&($(window).width() <= 767.98)){
    $('.secondModal').css("top","75%");
  }
  if(($(window).width() >= 992)&&($(window).width() <= 1199.98)){
    $('.secondModal').css("top","84%");
  }
  if(($(window).width() >= 1200)&&($(window).width() <= 1399)){
    $('.secondModal').css("top","79%");
  }
  if(($(window).width() >= 1400)&&($(window).width() <= 1900)){
    $('.secondModal').css("top","75%");
  }
  if(($(window).width() >= 1901)){
    $('.secondModal').css("top","79%");
  }

  $('.secondModal .modal-content').css("background-color","#32AAB2");
  $('.secondModal .modal-content').css("width","100%");
  if(($(window).width() >= 1200)){
    $('.secondModal .modal-content').css("width","89%");
  }
  $('.centeredimage').attr("src","../../../assets/imgs/Icons-01.png");
  $('.navigation .our-prev-icon').css("color","#3EB7BA");
  // centeredimage
}
opensmodal(){
  this.hidenow=false;
  this.hidelate=true;

$('#songplayer').css("display","none");
$('.firstimage').css("display","block");
$('.secondModal').css("top","28%");
$('.secondModal .modal-content').css("background-color","#3EB7BA");
$('.secondModal .modal-content').css("width","90%");
// edit
if(($(window).width() <= 319)){
  $('.secondModal .navigation a').css("font-size","15px");
  $('.secondModal .navigation .secondimage').css("width","59px");
}
if(($(window).width() >= 768)&&($(window).width() <= 991)){
  $('.secondModal .modal-content').css("width","80%");
}
if(($(window).width() >= 992)&&($(window).width() <= 1199)){
  $('.secondModal .modal-content').css("width","90%");
}
if(($(window).width() >= 1200)){
  $('.secondModal .modal-content').css("width","80%");
}

// edit
$('.centeredimage').attr("src","../../../assets/imgs/playericon.png");
$('.navigation .our-prev-icon').css("color","#1a5356");
}


hideAlbums:boolean=true;
showAlbumsongs:boolean=false;

// get songs of albums list
GetSongsOfAlbum(albumId)
{
//debugger;
    this.paginationSong = 0;
    this.songsList = [];
    this.isLoading = true;
    this.SongsService.GetSongsOfAlbum(this.paginationSong , String(this.mycountalb) , albumId).subscribe(res =>{
      
      
      for(var i in res.result){
        this.songsList.push(res.result[i]);
      }

      if( this.songsList.length >= res.length ){
        this.morealbsong = false;
      }else{
          this.morealbsong = true;
      }

      this.SelectesAlbumID = res.result[0].album.id;

      this.isLoading = false;
    });


    this.SongsService.GetSongsOfAlbum("0" , "1" , albumId).subscribe(res =>{
      this.songsalbumsData = res.result;
    });
    
    this.hideAlbums=false;
    this.showAlbumsongs=true;

}

// load more albums
loadmorealbums(){
  this.pagination = this.pagination = 1
  if(localStorage.getItem('searchTxt') != null){
    if(this.Aroute.snapshot.params.id != null ){
      
      this.isLoading = true;
      this.AlbumService.Search(String(this.pagination) , String(this.mycountalb) , localStorage.getItem('searchTxt'), this.Aroute.snapshot.params.id).subscribe(res =>{
        for(var i in res.result){
          this.albumList.push(res.result[i]);
        }

        if( this.albumList.length >= res.length ){
          this.morealbums = false;
        }else{
            this.morealbums = true;
        }

        this.isLoading = false;
      });
    }else{
      this.isLoading = true;
      this.AlbumService.Search(String(this.pagination) , String(this.mycountalb) , localStorage.getItem('searchTxt'), null).subscribe(res =>{

        for(var i in res.result){
          this.albumList.push(res.result[i]);
        }

        if( this.albumList.length >= res.length ){
          this.morealbums = false;
        }else{
            this.morealbums = true;
        }

        this.isLoading = false;
        
      });
    }
  }else
  {

    if(this.Aroute.snapshot.params.id != null ){
      this.isLoading = true;
      this.AlbumService.Search("0" , String(this.mycountalb) , "", this.Aroute.snapshot.params.id).subscribe(res =>{
        for(var i in res.result){
          this.albumList.push(res.result[i]);
        }

        if( this.albumList.length >= res.length ){
          this.morealbums = false;
        }else{
            this.morealbums = true;
        }
        this.isLoading = false;
      });
    }else{
      this.isLoading = true;
      this.AlbumService.Search("0" , String(this.mycountalb) , "", null).subscribe(res =>{
        for(var i in res.result){
          
          this.albumList.push(res.result[i]);
        }

        if( this.albumList.length >= res.length ){
          this.morealbums = false;
        }else{
            this.morealbums = true;
        }

        this.isLoading = false;

      });
    }

   //console.log("title Of load more");


  }
 
}

backalbums(){
  this.hideAlbums=true;
  this.showAlbumsongs=false;
}


  artistIdGet: String;
  ngOnInit(): void {

    this.getMobileOperatingSystem();

    this.Aroute.queryParams.subscribe(params => {
      this.searchText=  params['searchText'];

      if(localStorage.getItem('searchTxt') != null){
        if(this.Aroute.snapshot.params.id != null ){
          
          this.AlbumService.Search("0" , String(this.mycountalb) , localStorage.getItem('searchTxt'), this.Aroute.snapshot.params.id).subscribe(res =>{
            this.albumList = res.result;
       
            
            if( this.albumList.length >= res.length ){
              this.morealbums = false;
            }else{
                this.morealbums = true;
            }

            this.isLoading = false;

          });

          
        }else{
          this.AlbumService.Search("0" , String(this.mycountalb) , localStorage.getItem('searchTxt'), null).subscribe(res =>{
            this.albumList = res.result;
           
            if( this.albumList.length >= res.length ){
              this.morealbums = false;
            }else{
                this.morealbums = true;
            }
            
            this.isLoading = false;
          });
        }
      }else
      {

        if(this.Aroute.snapshot.params.id != null ){
          this.AlbumService.Search("0" , String(this.mycountalb) , "", this.Aroute.snapshot.params.id).subscribe(res =>{
            this.albumList = res.result;
  
            if( this.albumList.length >= res.length ){
              this.morealbums = false;
            }else{
                this.morealbums = true;
            }

            this.isLoading = false;


          });
        }else{
          this.AlbumService.Search("0" , String(this.mycountalb) , "", null).subscribe(res =>{
            this.albumList = res.result;
            
            if( this.albumList.length >= res.length ){
              this.morealbums = false;
            }else{
                this.morealbums = true;
            }
            
            this.isLoading = false;
            
          });
        }




      }
      // ToDo::Search
      


    }); 


    if(localStorage.getItem('userToken') != null){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
 
  
    $(document).ready(function() {

      $('ul li a').click(function(){
        $('.song').removeClass('song');
        $(this).addClass("song");

        //audio here
        var playing = false;
       
            

    });
    });

    
  }

  
  SearchArtist(){
    this.ArtistService.SearchAlphapet("0" , String(this.mycountalb), this.searchText).subscribe(res =>{
    this.artistList = res.result;
     if(this.artistList.length <= 9 ){
       this.moreartist = false;
     }
     else{
      this.moreartist = true;
     }
      // end 2411

    this.SearchSongs("0",  String(this.mycountalb),this.artistList[0].id );
    
    })

  }
  SearchSongs(offset , limit , artistId){
    this.SongsService.GetSongsOfArtist( offset, limit, artistId).subscribe(res =>{
     this.songsList = res.result;
     // start 2411
     if(this.songsList.length <= 9 ){
       this.moresongs = false;
     }
     else{
      this.moresongs = true;
     }
      // end 2411
    })
    this.SearchAlbums(offset , limit , artistId);
  }
  SearchAlbums(offset , limit , artistId)
  {
    this.AlbumService.GetAlbumsOfArtist(offset , limit , artistId)
    .subscribe(res =>{
       this.albumList = res.result;
     if(this.albumList.length <= 9 ){
       this.morealbums = false;
     }
     else{
      this.morealbums = true;
     }
      // end 2411
     });
}
// moataz
getArtistAlbums(SetArtistId:any){
  this.SongsService.getArtistAlbums("0" , String(this.mycountalb) , SetArtistId ).subscribe((data) =>{

    this.showAlbums = true;
    this.showArtists = false;
    
    this.albumList = data.result;

   //console.log("Alo list");
    
   //console.log(data);
  }, (err: HttpErrorResponse) => {
   //console.log("Eroooooooor 545");
  });
}

DownloadAudio(e ,song)
{
  e.preventDefault();
  var songURL = `http://188.225.184.108:9091/api/songs/playsong/${song}`
  var a = $("<a>")
    .attr("href", songURL)
    .attr("download", "audio.mp3")
    .appendTo("body");

a[0].click();

a.remove();
}

///////////////////////////////////// all load functions

SearchloadArtist(){
  this.ArtistService.SearchAlphapet("0" , String(this.mycountalb), this.searchText).subscribe(res =>{
   this.artistList = res.result;
  //console.log(this.artistList);
  })

}
SearchloadSongs(offset , limit , artistId){
  this.SongsService.GetSongsOfArtist( offset, limit , artistId).subscribe(res =>{
    this.songsList = res.result;
   //console.log(this.songsList);
  })
}

// load more songs
loadmoresongs (){
this.count=this.count + 9;

this.Aroute.queryParams.subscribe(params => {
  this.searchText=  params['searchText'];
  if(this.searchText != null) 
  {

   this.SearchloadSongs("0", String(this.count),this.artistList[0].id );
   
  }
  else{

     this.SongsService.Search( "0",String(this.count) , "").subscribe(res =>{
       this.songsList = res.result;
      //console.log(this.songsList);
      });

  }
 }); 

}

// load more artists
loadartisits(){

  if(this.searchText != null) 
  {
    this.SearchloadArtist();
    ////console.log("hello");
  }
  else{
    this.ArtistService.SearchArtist("0" , String(this.mycountalb) ,"").subscribe(res =>{
      this.artistList = res.result;
     //console.log( this.artistList);
      });
    
  }
}



//load more album songs 
loadalbumssongs(){

  this.paginationSong = this.paginationSong+1;

  this.isLoading = true;
  this.SongsService.GetSongsOfAlbum(this.paginationSong  , String(this.AlbumSongsOffcet) , this.SelectesAlbumID ).subscribe(res =>{

    for(var i in res.result){
      this.songsList.push(res.result[i]);
    }


    this.SelectesAlbumID = res.result[0].album.id;


    if( this.songsList.length >= res.length ){
        this.morealbsong = false;
    }else{
        this.morealbsong = true;
    }

    this.isLoading = false;
});
  
}

}
