import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
interface ICategory {
  name: string;
  id: string;
}

declare var jQuery: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('addNoteModal') addNoteModal: ElementRef;
  @ViewChild('showNoteModal') showNoteModal: ElementRef;
  @ViewChild('updateNoteModal') updateNoteModal: ElementRef;

  categories: ICategory[] = [
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
  selectedNote: any;
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
    this.selectedNote = this.newNote = this.getBlankCategoryObject();
  }

  getBlankCategoryObject(): any {
    const random = Math.round(Math.floor(Math.random() * 100) * Math.random() + Math.random());
    return {
      id: '',
      title: 'test ' + random,
      description: 'test ' + random,
      category: '1',
      createdOn: '16 Nov 2020',
      amount: random,
    };
  }

  openCreateModal(): any {
    this.newNote = this.getBlankCategoryObject();
    jQuery(this.addNoteModal.nativeElement).modal('show');
  }

  openShowModal(note): any {
    this.selectedNote = note;
    jQuery(this.showNoteModal.nativeElement).modal('show');
  }

  openUpdateModal(note): any {
    this.selectedNote = {...note};

    jQuery(this.updateNoteModal.nativeElement).modal('show');
  }

  getCategoryName(categoryId): string {
    const selectedCategory =  this.categories.filter((category) => {
      return category.id === categoryId;
    });

    return  selectedCategory && selectedCategory.length ? selectedCategory[0].name : '';
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
     },
     (error) => {
      console.log('PostComponent createNote: ', error);
     });
  }

  updateNote(): any {
    this.noteService.updateNote(this.selectedNote).subscribe((note) => {
      jQuery(this.updateNoteModal.nativeElement).modal('hide');
     },
     (error) => {
      console.log('PostComponent updateNote: ', error);
     });

  }

  deleteNote(noteId): any {
    this.noteService.deleteNote(noteId).subscribe(
      (result) => {
      console.log('deleted : ', noteId);
     });
  }

}
