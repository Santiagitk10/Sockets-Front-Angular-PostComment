import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import  { PostView, CommentView } from './viewModels';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  //GENERAL SPACE LOCAL
  // connectToGeneralSpace():WebSocketSubject<PostView>{
  //   return webSocket('ws://localhost:8082/retrieve/mainSpace');
  // }

  //GENERAL SPACE HEROKU
  connectToGeneralSpace():WebSocketSubject<PostView>{
    return webSocket('WSS://gama-sofka.herokuapp.com/retrieve/mainSpace');
  }

  //SPECIFIC SPACE LOCAL
  // connectToSpecificSpace(postId:string):WebSocketSubject<CommentView>{
  //   return webSocket(`ws://localhost:8082/retrieve/${postId}`);
  // }

  //SPECIFIC SPACE HOROKU
  connectToSpecificSpace(postId:string):WebSocketSubject<CommentView>{
    return webSocket(`WSS://gama-sofka.herokuapp.com/retrieve/${postId}`);
  }

}
