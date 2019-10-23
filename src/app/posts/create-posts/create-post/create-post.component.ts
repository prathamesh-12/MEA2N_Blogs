import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
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
  private showLoadingSpinner: boolean = false;
  form: FormGroup;
  imageURL: string;

  constructor( private _postsService: PostsService, private _router: Router, private _activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
  
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'uploadedImage': new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this._activatedRoute.params
      .subscribe((params: Params) => {
        if(params["id"]) {
          this.isEditMode = true;
          this.showLoadingSpinner = true;
          this._postsService.getPostByID(params["id"])
          .subscribe(data => {
            this.showLoadingSpinner = false;
              this.post = {
                id: data._id,
                title: data.title,
                content: data.content
              };
              this.form.setValue({
                'title': this.post.title,
                'content': this.post.content
              });
            })
        } else {
          this.isEditMode = false;
        }
      })
  }

  onCreatePostForm() {
    const postObj = {
      title: this.form.value.title,
      content: this.form.value.content,
      id: this.isEditMode ? this.post.id : null
    };
    
    if (this.isEditMode) {
      //write edit code  
      this._postsService.updatePost(postObj);
   
    } else {
      this._postsService.createPost(postObj);
    }
    this.form.reset();
  }

  onUploadChange(event: Event) {
    const uploadFile = (<HTMLInputElement>(event.target)).files[0];
    this.form.patchValue({
      'uploadedImage': uploadFile
    });
    this.form.get('uploadedImage').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imageURL = <string>(fileReader.result);
    }
    fileReader.readAsDataURL(uploadFile);
  }

}
