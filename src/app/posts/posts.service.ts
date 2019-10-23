import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject = new Subject<Post[]>();
  posts: Post[] = [];

  constructor( private _http: HttpClient, private _router: Router ) { }

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
      .subscribe((respData: {message: String, postID: any}) => {
        postObj.id = respData.postID;
        this.posts.push(postObj);
        this.postsSubject.next([...this.posts]);
        this._router.navigate(["/"]);
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
    
    updatePost(postObj: Post) {
      this._http.put('http://localhost:3000/api/posts/'+postObj.id, postObj)
      .subscribe((resp: {message: string}) => {
        const foundIndex = this.posts.findIndex(post => post.id === postObj.id);
        this.posts[foundIndex] = postObj;
        this.postsSubject.next([...this.posts]);
        this._router.navigate(["/"]);
      })
  }

  getPostByID(id: any) {
    //return this.posts.find(post => post.id === id);
    return this._http.get<{_id: any, title: string, content: string}>("http://localhost:3000/api/posts/"+id);
  }
}
