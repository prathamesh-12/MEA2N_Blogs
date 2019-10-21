import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
      .pipe(
        map((postsData: any) => {
          return postsData.posts.map(post=> {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            }
          })
        })
      )
      .subscribe((postsData) => {
        this.posts = [...postsData];
        this.postsSubject.next([...this.posts]);
      })
  }

  createPost(postObj: Post) {
    this._http.post('http://localhost:3000/api/posts', postObj)
    .subscribe((respData: {message: String, id: any}) => {
        postObj.id = respData.id;
        this.posts.push(postObj);
        this.postsSubject.next([...this.posts]);
      }, errorResp => {
        debugger;
      })
  }

  deletePost(id: any) {
    this._http.delete('http://localhost:3000/api/posts/' + id)
      .subscribe((message: string) => {
        let updatedPosts = this.posts.filter((post: Post) => {
            return post.id !== id;
        })
        this.posts = updatedPosts;
        this.postsSubject.next([...this.posts]);
      })
  }
}
