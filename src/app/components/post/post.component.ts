import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommentView } from 'src/app/services/viewModels';
import { SocketService } from 'src/app/services/socket.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!:Post;
  socketManager?:WebSocketSubject<CommentView>

  constructor(private socket:SocketService) { }

  ngOnInit(): void {
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

}
