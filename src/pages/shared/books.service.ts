import { Injectable } from '@angular/core';
import { Http       } from '@angular/http';
import { Observable } from 'rxjs';

import { ENV } from '../../environments/environment';


@Injectable()
export class BooksService {

  constructor(private http: Http) { }

  getAllBooks(
    schoolId:  number,
    pageSize:  number = 30,
    pageIndex: number = 0,
    name:      string = '',
    listType:  string = 'all',
    isbn10:    string = '',
    isbn13:    string = '',
    minPrice:  number = 0,
    maxPrice:  number = 0
  ): Observable<any> {
    const params = {
      page_size:  pageSize,
      page_index: pageIndex,
      name:       name,
      list_type:  listType,
      isbn10:     isbn10,
      isbn13:     isbn13,
      min_price:  minPrice,
      max_price:  maxPrice
    };

    return this.http.get(ENV.API_URL + `schools/${schoolId}/books`, {params: params})
    .map(res => {
      return res.json().data || [];
    })
    .catch(err => {
      return Observable.throw(err.json().message || 'unable to get books');
    });
  }

  getUserBooks(
    userId:    number,
    pageSize:  number = 30,
    pageIndex: number = 0
  ): Observable<any> {
    const params = {
      user_id:    userId,
      page_size:  pageSize,
      page_index: pageIndex
    };

    return this.http.get(ENV.API_URL + `users/${userId}/books`, {params: params})
    .map(res => {
      return res.json().data || [];
    })
    .catch(err => {
      return Observable.throw(err.json().message || 'unable to get books');
    });
  }

  updateBook(
    userId:   number,
    bookId:   number,
    bookName: string,
    isbn10:   string,
    isbn13:   string,
    price:    number,
    details:  string,
    listType: string
  ): Observable<any> {
    const body = {
      user_id:   userId,
      book_id:   bookId,
      name:      bookName,
      isbn10:    isbn10,
      isbn13:    isbn13,
      price:     price,
      details:   details,
      list_type: listType
    };

    return this.http.patch(ENV.API_URL + `users/${userId}/books`, body)
      .map(res => {
        return res.json().data || [];
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to update book');
      });
  }

  updateBookImage(userId: number, bookId: number, image: File): Observable<any> {
    let formData = new FormData();
   	formData.append('book_id',   bookId.toString());
    formData.append('image',     image);

    return this.http.post(ENV.API_URL + `users/${userId}/books/image`, formData)
      .map(res => {
        return res.json().data || [];
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to update book image');
      });
  }

  listBook(newBook: any): Observable<any> {
    let formData = new FormData();

    const body = {
      user_id:   newBook.user_id,
      school_id: newBook.school_id,
      name:      newBook.name,
      isbn10:    newBook.isbn10.toString(),
      isbn13:    newBook.isbn13.toString(),
      details:   newBook.details,
      list_type: newBook.list_type,
      price:     parseFloat(newBook.price),
    };

    return this.http.post(ENV.API_URL + `users/${newBook.user_id}/books`, body)
      .map(res => {
        return res.json().data || [];
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to add book');
      });
  }

  deleteBook(bookId: number, userId: number): Observable<any> {
    return this.http.delete(ENV.API_URL + `users/${userId}/books/${bookId}`)
      .map(res => {
        return res.json().message || 'book successfully deleted';
      })
      .catch(err => {
        return Observable.throw(err.json().message || 'unable to delete book');
      });
  }

}
