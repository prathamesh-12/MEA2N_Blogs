import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../posts.service';
import { Post } from '../../post.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private isEditMode: boolean = false;
  private post: Post;

  constructor( private _postsService: PostsService, private _router: Router, private _activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe((params: Params) => {
        if(params["id"]) {
          this.isEditMode = true;
          this._postsService.getPostByID(params["id"])
            .subscribe(data => {
              this.post = {
                id: data._id,
                title: data.title,
                content: data.content
              };
            })
        } else {
          this.isEditMode = false;
        }
      })
  }

  onCreatePostForm(form: NgForm) {
    const postObj = {
      title: form.value.title,
      content: form.value.content,
      id: this.isEditMode ? this.post.id : null
    };
    
    if (this.isEditMode) {
      //write edit code  
      this._postsService.updatePost(postObj);
   
    } else {
      this._postsService.createPost(postObj);
    }
    this._router.navigate(["../"])
    form.resetForm();
  }

}
