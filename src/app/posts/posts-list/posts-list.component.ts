import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  fetchPostsSubscription: Subscription;
  
  constructor( private _postsService: PostsService ) { }

  ngOnInit() {
    this._postsService.getPosts();
    this.fetchPostsSubscription = this._postsService.postsSubject
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      })
  }

  ngOnDestroy(): void {
    this.fetchPostsSubscription.unsubscribe();
  }

}
