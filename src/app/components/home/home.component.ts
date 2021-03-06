import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LogLevel } from '@aspnet/signalr';
import { Post } from '../../models/Post';
import { PostForCreation } from '../../models/PostForCreation';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth-service/auth.service';
import * as signalR from '@aspnet/signalr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  posts: Post[];

  formPostTitle: string;
  formPostBody: string;

  constructor(private authService: AuthService, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getPosts(this.user.name);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/message', {})
      .configureLogging(LogLevel.Information)
      .build();

    connection.on('send', data => {
      const post: Post = data;
      if (post.postId !== null && post.postId !== undefined) {
        if (this.authService.getUser().id !== undefined && this.authService.getUser().id !== null) {
          this.posts.unshift(post);
        }
      }

    });

    connection.start().then(() => connection.invoke('Authorize', this.authService.getUser().id));
  }

  getPosts(value: string) {
    this.http.get<Post[]>(`api/subs/${value}`)
      .subscribe(data => {
          if (true) {
            // this.posts = data.reverse();
            this.posts = data.sort((a, b) => {
              return +new Date(a.date) - +new Date(b.date);
            }).reverse();
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
            this.showSnackbar('Post has been created!');
            (document.getElementById('inputPostTitle') as HTMLInputElement).value = '';
            (document.getElementById('inputPostBody') as HTMLInputElement).value = '';
          },
          (error: HttpErrorResponse) => {
            this.showSnackbar('Error!');
          });

    }
  }

  delete(postId: number) {
    this.http.delete(`api/posts/${postId}`)
      .subscribe(() => { this.getPosts(this.user.name); }, (error: HttpErrorResponse) => {
      });
    // this.getPosts((document.getElementById('userNameInput') as HTMLInputElement).value);
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }

}

