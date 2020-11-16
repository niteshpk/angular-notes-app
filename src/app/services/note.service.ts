import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import db from './firebase';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNotes(): Observable<any> {
    return new Observable((observer) => {
      db.collection('/notes').onSnapshot((snapshot) => {
        observer.next(
          snapshot.docs.map((doc) => {
            return Object.assign(doc.data(), { id: doc.id });
          })
        );
      });
    });
  }

  createNote(note): Observable<any> {
    return new Observable((observer) => {
      db.collection('notes')
        .add(note)
        .then((newObj) => {
          note = Object.assign(note, { id: newObj.id });
          observer.next(note);
        })
        .catch((error) => {
          console.log('NoteService createNote: ', error);
          observer.error(new Error(error));
        });
    });
  }

  deleteNote(noteId): Observable<any> {
    return new Observable((observer) => {
        db.collection('notes')
          .doc(noteId)
          .delete()
          .then(() => {
            observer.next(true);
          })
          .catch((error) => {
            console.error('Error deleteUser: ', error);
            observer.error(new Error(error));
          });
      });
  }

  updateNote(note): Observable<any> {
    const id = note.id;
    delete note.id;
    return new Observable((observer) => {
      db.collection('notes')
        .doc(id)
        .update(note)
        .then(() => {
          note.id = id;
          observer.next(note);
        })
        .catch((error) => {
          console.error('Error updateNote: ', error);
          observer.error(new Error(error));
        });
    });
  }
}