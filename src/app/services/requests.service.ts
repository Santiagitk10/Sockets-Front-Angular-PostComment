import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post , CreatePostCommand } from './models';

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
    return this.httpClient.get<Post[]>("http://localhost:8081/bringallposts");
  }

  bringPostById(postId: string | null):Observable<Post>{
    return this.httpClient.get<Post>( `http://localhost:8081/bringpost/${postId}`);
  }

  createPost(command:CreatePostCommand): Observable<Object>{
    return this.httpClient.post("http://localhost:8080/create/post",command, this.httpOptions);
  }


}
