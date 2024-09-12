import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://api.brevo.com/v3/smtp/email';
  private apiKey = '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';
 
  constructor(private http: HttpClient) { }
 
  sendEmail(email: string, name: string, htmlContent: string, subject: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'api-key': this.apiKey,
      'content-type': 'application/json'
    });
 
    const body = {
      sender: {
        name: 'Pablo',
        email: 'no-reply@dominio.com'
      },
      to: [
        {
          email,
          name
        }
      ],
      htmlContent,
      subject
    };
 
    return this.http.post(this.apiUrl, body, { headers });
  }
}