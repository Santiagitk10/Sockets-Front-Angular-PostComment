import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Post, CreatePostCommand } from '../../services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from 'src/app/services/socket.service';
import { PostView } from 'src/app/services/viewModels';



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
  postToLookUp:string = "";
  foundPost?:Post;

  constructor(private requests:RequestsService, private socket:SocketService) { }


  ngOnInit(): void {
    // TO USE ONCE BETA IS CREATED
    this.bringPosts();
    this.connectToMainSpace();
  }

  ngOnDestroy(): void {
    this.closeSocketConnection();
  }

  // TO USE ONCE BETA IS CREATED
  bringPosts(){
    this.requests.bringAllPosts().subscribe(posts => {
      //CONSOLE LOG Para validar que los posts están llegando correctamente de Beta
      console.log(posts);
      this.posts = posts;
    });
  }



  submitPost(){
    const newCommand: CreatePostCommand = {
      postID: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }
    this.requests.createPost(newCommand).subscribe();

    this.newTitle= "";
    this.newAuthor= "";
  }

  startSearch(){
    this.requests.bringPostById(this.postToLookUp).subscribe(post => {
      this.foundPost = post;
    })
  }

  connectToMainSpace(){
    this.socketManager = this.socket.connectToGeneralSpace()
    this.socketManager.subscribe((postMessage) => {
      this.insertPost(postMessage);
    })
  }

  insertPost(post:PostView){
    this.newAuthor = "";
    this.newTitle = "";
    this.posts?.unshift(post);
  }

  closeSocketConnection(){
    this.socketManager?.complete();
  }

}
