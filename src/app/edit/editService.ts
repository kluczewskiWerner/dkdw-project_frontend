import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public edit(user): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/user`, {
      firstName: user.firstName,
      lastName: user.lastName
    });
  }
}