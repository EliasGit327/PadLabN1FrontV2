import { Injectable } from '@angular/core';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  user: User;
}
