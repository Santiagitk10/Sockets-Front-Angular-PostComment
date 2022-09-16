import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RequestsService } from 'src/app/services/requests.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private state:StateService,
    private request:RequestsService
  ) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){
    const response = await this.authService.logInWithGoogle()
    if(response){
      this.request.login({
          username: response.user.email,
          password: response.user.email
      })
      .pipe(catchError(err => of(err)))
      .subscribe(token => {
        console.log(token)
        this.state.state.next({
          logedIn: true,
          authenticatedPerson: response,
          token: token.token
        })
        this.router.navigateByUrl('/main'); //PENDING TO SEE IF THE / GOES THERE
      })
      
    }
    console.log(response);
  }

}
