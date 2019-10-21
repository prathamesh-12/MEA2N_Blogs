import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { CreatePostComponent } from './posts/create-posts/create-post/create-post.component';

const routes: Routes = [
    { path: '', component: PostsListComponent },
    { path: 'new', component: CreatePostComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutes {

}