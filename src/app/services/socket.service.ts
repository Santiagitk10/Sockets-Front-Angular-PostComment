import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import  { PostView, CommentView } from './viewModels';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  connectToGeneralSpace():WebSocketSubject<PostView>{
    return webSocket('ws://localhost:8082/retrieve/mainSpace');
  }

  connectToSpecificSpace(postId:string):WebSocketSubject<CommentView>{
    return webSocket(`ws://localhost:8082/retrieve/${postId}`);
  }


}
