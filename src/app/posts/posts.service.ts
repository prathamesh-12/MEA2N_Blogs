import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject = new Subject<Post[]>();
  posts: Post[] = [];
  // posts: Post[] = [
    // {
    //   "title": "Title 1",
    //   "content": "This is content 1",
    //   "id": 'jshduh1223'
    // },
    // {
    //   "title": "Title 2",
    //   "content": "This is content 2",
    //   "id": 'hsdhdj445'
    // }
  // ];

  constructor( private _http: HttpClient ) { }

  getPosts() {
    //return [...this.posts];
    this._http.get('http://localhost:3000/api/posts')
      .subscribe((postsData: {message: String, posts: Post[]}) => {
        this.posts = [...postsData.posts];
        this.postsSubject.next([...this.posts]);
      })
  }

  createPost(obj: Post) {
    this._http.post('http://localhost:3000/api/posts', obj)
    .subscribe((respData: {message: String}) => {
        debugger;
        this.posts.push(obj);
        this.postsSubject.next([...this.posts]);
      }, errorResp => {
        debugger;
      })
  }
}
