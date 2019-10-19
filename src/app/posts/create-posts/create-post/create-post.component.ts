import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../posts.service';
import { Post } from '../../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor( private _postsService: PostsService ) { }

  ngOnInit() {
  }

  onCreatePostForm(form: NgForm) {
    let postObj = {
      title: form.value.title, content: form.value.content, id: null
    };
  
    this._postsService.createPost(postObj);
    form.reset();
    
  }

}
