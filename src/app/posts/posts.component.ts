import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
declare var jQuery: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('addNoteModal') addNoteModal: ElementRef;
  categories = [
    {
      name: 'Category 1',
      id: '1'
    },
    {
      name: 'Category 2',
      id: '2'
    },
    {
      name: 'Category 3',
      id: '3'
    }
  ];
  newNote: any;
  // posts = [
  //   {
  //     id: 1,
  //     title: 'Post 1 title',
  //     description: 'Post 1 description',
  //     category: 'Post 1 category',
  //     createdOn: '11 Jan 2020',
  //     amount: 123456,
  //   },
  //   {
  //     id: 2,
  //     title: 'Post 2 title',
  //     description: 'Post 2 description',
  //     category: 'Post 2 category',
  //     createdOn: '21 Jan 2020',
  //     amount: 123456987,
  //   }
  // ];

  posts = [];

  constructor(
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    // this.newNote = this.getBlankCategoryObject();
    this.noteService.getNotes().subscribe((notesArr) => {
     this.posts = notesArr;
    });
    this.newNote = this.getBlankCategoryObject();
  }

  getBlankCategoryObject(): any {
    return {
      id: '',
      title: '',
      description: '',
      category: '',
      createdOn: '',
      amount: '',
    };
  }

  addNote(): any {
    this.newNote = this.getBlankCategoryObject();
    jQuery(this.addNoteModal.nativeElement).modal('show');
  }

  createNote(): any {
    this.noteService.createNote({
      title: this.newNote.title,
      description: this.newNote.description,
      category: this.newNote.category,
      createdOn: '11 Jan 2020',
      amount: this.newNote.amount,
    }).subscribe((note) => {
      jQuery(this.addNoteModal.nativeElement).modal('hide');
     });

  }

  deleteNote(noteId): any {
    this.noteService.deleteNote(noteId).subscribe(
      (result) => {
      console.log('deleted : ', noteId);
     });
  }

}
