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