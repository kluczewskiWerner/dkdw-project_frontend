import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../_services/token-storage.service';
import { EditService } from './editService';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: any = {}
  isSuccessful = false;
  isLoggedIn = false;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private router: Router, private http: HttpClient, private tokenStorageService: TokenStorageService,
    private editService: EditService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(!this.isLoggedIn) {
      this.router.navigate(['login']);
    } 
  }

  onSubmit(): void {
    this.editService.edit(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true
      }
    )
  }

  public remove() {
    this.http.delete(`${this.apiServerUrl}/user/delete`).subscribe(
      function(response) { console.log("Success Response" + response)},
      function(error) { console.log("Error happened" + error)},
      function() { console.log("Remove completed")}
    );

    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
