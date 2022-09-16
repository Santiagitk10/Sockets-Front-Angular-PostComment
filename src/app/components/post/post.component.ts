import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommentView, PostView } from 'src/app/services/viewModels';
import { SocketService } from 'src/app/services/socket.service';
import { RequestsService } from 'src/app/services/requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreateCommentCommand } from 'src/app/services/models';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!:Post;
  socketManager?:WebSocketSubject<CommentView>
  newCommentContent:string = '';
  newCommentAuthor:string = '';

  lastState:any;
  isFormReady:boolean = true;
  hasToken:boolean = true;

  constructor(
    private requests:RequestsService,
    private socket:SocketService,
    private route: ActivatedRoute,
    private location: Location,
    private state:StateService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.validateLogin()){
      this.startSearch();
    }
    
  }


  validateLogin():boolean{
    let isValid = false;
    this.state.state.subscribe(currentState => {
      this.lastState = currentState;
      if(!currentState.logedIn){
        // this.router.navigateByUrl('') //PENDING TO SEE IF IT isValid MUST BE ASSIGNED AGAIN TO FALSE
        return;
      }
      isValid = true;
    })
    return isValid;
  }



  ngOnDestroy(): void {
    this.closeSocketConnection();
  }


  connectToPostSpace(){
    this.socketManager = this.socket.connectToSpecificSpace(this.post.aggregateId)
    this.socketManager.subscribe((comment) => {
      this.post.comments.unshift(comment);
    })
  }



  closeSocketConnection(){
    this.socketManager?.complete();
  }


  startSearch(): void{
    const postId:string | null = this.route.snapshot.paramMap.get('id')
    this.requests.bringPostById(postId).subscribe(post => {
      this.post= post;
      this.connectToPostSpace();
    })
  }

  goBack(): void {
    this.location.back();
  }

  sendComment(){

    let token = this.state.state.getValue().token;

    if(this.newCommentAuthor === "" || this.newCommentContent === ""){
      this.isFormReady = false;
      this.newCommentContent = "";
      this.newCommentAuthor = "";
      return;
    }

    if(!token){
      this.hasToken = false;
      this.newCommentContent = "";
      this.newCommentAuthor = "";
      return;
    }

    const newCommand: CreateCommentCommand = {
      postID: this.post.aggregateId,
      commentID: Math.floor(Math.random() * 100000).toString(),
      author: this.newCommentAuthor,
      content: this.newCommentContent
      
    }
    this.requests.createComment(newCommand, this.lastState.token).subscribe();

    this.newCommentAuthor= "";
    this.newCommentContent= "";
  }

}
