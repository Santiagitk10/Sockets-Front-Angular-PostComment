import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  initialState = {
    logedIn: false,
    authenticatedPerson: {},
    token:undefined
  }

  state = new BehaviorSubject(this.initialState);
  
  constructor() { }
}
