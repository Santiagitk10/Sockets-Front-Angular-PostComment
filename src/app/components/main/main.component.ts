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

  constructor(private requests:RequestsService, private socket:SocketService) { }


  ngOnInit(): void {
    this.bringPosts();
    this.connectToMainSpace();
  }

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

}
