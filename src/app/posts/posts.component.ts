import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts = [
    {
      id: 1,
      title: 'Post 1 title',
      description: 'Post 1 description',
      category: 'Post 1 category',
      createdOn: '11 Jan 2020',
      amount: 123456,
    },
    {
      id: 2,
      title: 'Post 2 title',
      description: 'Post 2 description',
      category: 'Post 2 category',
      createdOn: '21 Jan 2020',
      amount: 123456987,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
