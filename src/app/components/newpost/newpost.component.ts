import { Component, OnInit } from '@angular/core';
import { CreatePostCommand } from 'src/app/services/models';
import { RequestsService } from 'src/app/services/requests.service';
import { Post } from '../../services/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {


  newTitle:string = ""; 
  newAuthor:string = "";
  post?:Post;

  constructor(private requests:RequestsService, private router:Router) { }

  ngOnInit(): void {
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
    this.router.navigateByUrl('');
  }

}
