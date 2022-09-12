import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommentView, PostView } from 'src/app/services/viewModels';
import { SocketService } from 'src/app/services/socket.service';
import { RequestsService } from 'src/app/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CreateCommentCommand } from 'src/app/services/models';


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

  constructor(
    private requests:RequestsService,
    private socket:SocketService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.startSearch();
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
    const newCommand: CreateCommentCommand = {
      postID: this.post.aggregateId,
      commentID: Math.floor(Math.random() * 100000).toString(),
      author: this.newCommentAuthor,
      content: this.newCommentContent
      
    }
    this.requests.createComment(newCommand).subscribe();

    this.newCommentAuthor= "";
    this.newCommentContent= "";
  }

}
