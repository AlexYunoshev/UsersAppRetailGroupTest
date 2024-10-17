import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address, User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user: User;
  address: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data;
    this.transformAdress(this.user.address)
  }

  public transformAdress(adrress: Address) {
    this.address = adrress.street + ", " + adrress.city + ", " + adrress.state + ', ' + adrress.zip
  }
}
