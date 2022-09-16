import { Injectable } from '@angular/core';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, private state:StateService) { }

  logInWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  isLogged(){
    const lastState = this.state.state.getValue();
    return lastState.logedIn;
  }
}
