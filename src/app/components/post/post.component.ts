import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommentView } from 'src/app/services/viewModels';
import { SocketService } from 'src/app/services/socket.service';
import { RequestsService } from 'src/app/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!:Post;
  socketManager?:WebSocketSubject<CommentView>

  constructor(
    private requests:RequestsService,
    private socket:SocketService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.startSearch();
    this.connectToPostSpace();
  }

  connectToPostSpace(){
    this.socketManager = this.socket.connectToSpecificSpace(this.post.aggregateId)
    this.socketManager.subscribe((comment) => {
      this.post.comments.push(comment);
    })
  }

  

  ngOnDestroy(): void {
    this.closeSocketConnection();
  }

  closeSocketConnection(){
    this.socketManager?.complete();
  }


  startSearch(): void{
    const postId:string | null = this.route.snapshot.paramMap.get('id')
    this.requests.bringPostById(postId).subscribe(post => {
      this.post= post;
    })
  }

  goBack(): void {
    this.location.back();
  }

}
