import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = {id: 0, firstName: '', lastName: '', email: '', username: '', age: 0, gender: '', phone: '', address: { street: '', city: '', state: '', zip: '' }, photo: '' };
  isEdit = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userService.getUser(+id).subscribe(data => {
        this.user = data;
      });
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  // saveUser(): void {
  //   if (this.user.id) {
  //     this.userService.updateUser(this.user).subscribe(() => {
  //       this.router.navigate(['/users']);
  //     });
  //   } else {
  //     this.userService.addUser(this.user).subscribe(() => {
  //       this.router.navigate(['/users']);
  //     });
  //   }
  // }
}
