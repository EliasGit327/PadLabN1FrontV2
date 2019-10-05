import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostForCreation } from '../../models/PostForCreation';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  posts: Post[];

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getPosts(this.user.name);
  }

  getPosts(value: string) {
    this.http.get<Post[]>(`api/subs/${value}`)
      .subscribe(data => {
          if (true) {
            this.posts = data;
            // this.postMessage = '';
          } else {
            // this.postMessage = 'User not found';
          }

        },
        (error: HttpErrorResponse) => {});
  }

  tryCreatePost(userName: string, titleIn: string, bodyIn: string) {
    const newPost: PostForCreation = {
      title: titleIn,
      body: bodyIn
    };

    if (newPost.title === '' || newPost.body === '' || userName === '') {
    } else {
      this.http.post(`api/users/${userName}/posts`, newPost)
        .subscribe(() => {
            // this.getPosts((document.getElementById('userNameInput') as HTMLInputElement).value);
          },
          (error: HttpErrorResponse) => {
          });
      (document.getElementById('userToCreateNameInput') as HTMLInputElement).value = '';
      (document.getElementById('postTitleInput') as HTMLInputElement).value = '';
      (document.getElementById('postBodyInput') as HTMLInputElement).value = '';
    }
  }

  delete(postId: number) {
    this.http.delete(`api/posts/${postId}`)
      .subscribe(() => { this.getPosts(this.user.name); }, (error: HttpErrorResponse) => {
      });
    this.getPosts((document.getElementById('userNameInput') as HTMLInputElement).value);
  }

}

