import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: 0, 
    firstName: '', 
    lastName: '', 
    email: '', 
    username: '', 
    age: 0, 
    gender: '', 
    phone: '', 
    address: { street: '', city: '', state: '', zip: '' }, 
    photo: '' 
  };

  isEdit = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.user = await lastValueFrom(this.userService.getUser(+id));
    }
  }

  private async getLastId() {
    let users = await lastValueFrom(this.userService.getUsers());
    let usersIds = users.map(user => user.id).sort();
    return usersIds[usersIds.length - 1] ?? 0;
  }

  async onSubmit() {
    if (this.isEdit) {
      await lastValueFrom(this.userService.updateUser(this.user));
      this.router.navigate(['/']);
    } 
    else {
      let lastID = await this.getLastId();
      this.user.id = lastID + 1;
      await lastValueFrom(this.userService.addUser(this.user));
      this.router.navigate(['/']);
    }
  }
}
