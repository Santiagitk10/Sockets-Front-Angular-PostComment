import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post , CreatePostCommand, CreateCommentCommand } from './models';
import { IToken } from './models';




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


  //BRING ALL POSTS HEROKU
  bringAllPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>("https://beta-sofka.herokuapp.com/bringallposts");
  }


  //BRING ALL POSTS LOCAL
  // bringAllPosts(): Observable<Post[]>{
  //   return this.httpClient.get<Post[]>("http://localhost:8081/bringallposts");
  // }


  //BRING POST BY ID HEROKU
  bringPostById(postId: string | null):Observable<Post>{
    return this.httpClient.get<Post>( `https://beta-sofka.herokuapp.com/bringpost/${postId}`);
  }


  //BRING POST BY ID LOCAL
  // bringPostById(postId: string | null):Observable<Post>{
  //   return this.httpClient.get<Post>( `http://localhost:8081/bringpost/${postId}`);
  // }



  //CREATE POST HEROKU
  // createPost(command:CreatePostCommand): Observable<Object>{
  //   return this.httpClient.post("https://alpha-sofka.herokuapp.com/create/post", command, this.httpOptions);
  // }


  //CREATE POST LOCAL
  createPost(command:CreatePostCommand, tocken:string): Observable<Object>{
    return this.httpClient.post("http://localhost:8080/create/post", command,
    {  headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ${tocken}`})} );
  }

 
  //CREATE COMMENT HEROKU
  // createComment(command:CreateCommentCommand): Observable<Object>{
  //   return this.httpClient.post("https://alpha-sofka.herokuapp.com/add/comment", command, this.httpOptions);
  // }


  //CREATE COMMENT LOCAL
  createComment(command:CreateCommentCommand, tocken:string): Observable<Object>{
    return this.httpClient.post("http://localhost:8080/add/comment", command,
    {  headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ${tocken}`})});
  }


  //LOGIN LOCAL 
  login(command:any):Observable<IToken>{
    return this.httpClient.post<IToken>("http://localhost:8080/authlogin", command, this.httpOptions);
  }

}
