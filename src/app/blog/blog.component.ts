import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  posts = [
    { id: 1, title: 'Post 1', excerpt: 'This is the excerpt for Post 1.' },
    { id: 2, title: 'Post 2', excerpt: 'This is the excerpt for Post 2.' },
    // Add more posts as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
