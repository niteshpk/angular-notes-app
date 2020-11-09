import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
          console.log('Error createNote: ', error);
          throwError(error);
        });
    });
  }
}
