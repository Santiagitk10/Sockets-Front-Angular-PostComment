import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Post, CreatePostCommand } from '../../services/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?:Post[];
  newTitle:string = "";
  newAuthor:string = "";
  postToLookUp:string = "";
  foundPost?:Post;

  constructor(private requests:RequestsService) { }

  ngOnInit(): void {
    // TO USE ONCE BETA IS CREATED
    this.bringPosts();
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

}
