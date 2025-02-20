import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedType: 'all' | 'applicant' | 'employee' = 'all';
  displayedColumns: string[] = ['documentId', 'name', 'type', 'actions'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log('load users', this.users);
      this.filterUsers();
    });
  }

  filterUsers(): void {
    this.filteredUsers =
      this.selectedType === 'all'
        ? this.users
        : this.users.filter((user) => user.type === this.selectedType);
  }

  createUser(): void {
    this.router.navigate(['/users/new']);
  }

  viewUser(id: string): void {
    this.router.navigate(['/users', id, 'view']);
  }

  editUser(id: string): void {
    this.router.navigate(['/users', id, 'edit']);
  }

  confirmDelete(user: User): void {
    if (
      confirm(
        `Are you sure you want to delete user ${user.firstName} ${user.lastName1}?`
      )
    ) {
      this.userService.deleteUser(user.id);
      this.loadUsers();
    }
  }
}
