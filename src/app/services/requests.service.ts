import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post , CreatePostCommand, CreateCommentCommand } from './models';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  bringAllPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>("https://beta-sofka.herokuapp.com/bringallposts");
  }

  // bringAllPosts(): Observable<Post[]>{
  //   return this.httpClient.get<Post[]>("http://localhost:8081/bringallposts");
  // }

  bringPostById(postId: string | null):Observable<Post>{
    return this.httpClient.get<Post>( `https://beta-sofka.herokuapp.com/bringpost/${postId}`);
  }

  // bringPostById(postId: string | null):Observable<Post>{
  //   return this.httpClient.get<Post>( `http://localhost:8081/bringpost/${postId}`);
  // }




  createPost(command:CreatePostCommand): Observable<Object>{
    return this.httpClient.post("https://alpha-sofka.herokuapp.com/create/post", command, this.httpOptions);
  }

  // createPost(command:CreatePostCommand): Observable<Object>{
  //   return this.httpClient.post("http://localhost:8080/create/post", command, this.httpOptions);
  // }

 

  createComment(command:CreateCommentCommand): Observable<Object>{
    return this.httpClient.post("https://alpha-sofka.herokuapp.com/add/comment", command, this.httpOptions);
  }

   // createComment(command:CreateCommentCommand): Observable<Object>{
  //   return this.httpClient.post("http://localhost:8080/add/comment", command, this.httpOptions);
  // }



}
