import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Post, CreatePostCommand } from '../../services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from 'src/app/services/socket.service';
import { PostView } from 'src/app/services/viewModels';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  socketManager?:WebSocketSubject<PostView>;
  posts?:Post[];
  newTitle:string = ""; 
  newAuthor:string = "";

  lastState:any;

  isFormReady:boolean = true;
  hasToken:boolean = true;

  constructor(
    private requests:RequestsService,
    private socket:SocketService,
    private state:StateService,
    private router:Router,
  ) { }



  ngOnInit(): void {
      this.bringPosts();
      this.connectToMainSpace();
  }

//TO DELETE
  // validateLogin():boolean{
  //   let isValid = false;
  //   this.state.state.subscribe(currentState => {
  //     console.log(currentState);
  //     this.lastState = currentState;
  //     if(!currentState.logedIn){
  //       this.router.navigateByUrl('') 
  //       return;
  //     }
  //     isValid = true;
  //   })
  //   return isValid;
  // }



  ngOnDestroy(): void {
    this.closeSocketConnection();
  }

  bringPosts(){
    this.requests.bringAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  

  connectToMainSpace(){
    this.socketManager = this.socket.connectToGeneralSpace()
    this.socketManager.subscribe((postMessage) => {
      this.insertPost(postMessage);
    })
  }



  insertPost(post:PostView){
    this.posts?.unshift(post);
  }



  closeSocketConnection(){
    this.socketManager?.complete();
  }


  submitPost(){
    
    let token = this.state.state.getValue().token;

    if(!token){
      this.hasToken = false;
      this.newTitle = "";
      this.newAuthor = "";
      return;
    }

    if(this.newTitle === "" || this.newAuthor === ""){
      this.isFormReady = false;
      this.newTitle = "";
      this.newAuthor = "";
      return;
    }

    
    const newCommand: CreatePostCommand = {
      postID: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }
    console.log(token);
    this.requests.createPost(newCommand, token).subscribe();

    this.newTitle= "";
    this.newAuthor= "";
  }


}
