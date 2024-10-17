import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.users = await lastValueFrom(this.userService.getUsers());
  }

  async deleteUser(id: number): Promise<void> {
    await lastValueFrom(this.userService.deleteUser(id));
    this.loadUsers(); 
  }

  editUser(id: number): void {
    this.router.navigate(['/edit-user', id]);
  }

  async detailsUser(id: number): Promise<void> {
    let userFull = await lastValueFrom(this.userService.getUser(+id));

    this.dialog.open(UserDetailsComponent, {
      position: {top: '25px', right: '25px' },
      data: userFull
    });
  }
}