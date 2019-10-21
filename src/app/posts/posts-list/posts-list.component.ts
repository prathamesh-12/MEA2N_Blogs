import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  fetchPostsSubscription: Subscription;
  
  constructor( private _postsService: PostsService, 
               private _router: Router,
               private _activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this._postsService.getPosts();
    this.fetchPostsSubscription = this._postsService.postsSubject
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      })
  }

  onDeletePost(postID: any) {
    this._postsService.deletePost(postID);
  }

  onEditPost(postID: any) {
    this._router.navigate(['edit', postID], {
      relativeTo: this._activatedRoute
    });
  }

  ngOnDestroy(): void {
    this.fetchPostsSubscription.unsubscribe();
  }

}
