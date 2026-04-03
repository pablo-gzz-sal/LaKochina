import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, QuoteRequest } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contacts';
  private quotesUrl = 'http://localhost:3000/api/quotes';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  addQuote(quote: QuoteRequest): Observable<any> {
    return this.http.post<QuoteRequest>(this.quotesUrl, quote);
  }
}