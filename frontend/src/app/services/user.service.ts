import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: '1',
      documentId: '12345678A',
      firstName: 'John',
      lastName1: 'Doe',
      type: 'applicant',
      education: [
        {
          institutionName: 'University A',
          degree: 'Computer Science',
          date: new Date('2020-06-15'),
        },
      ],
    },
    // Add more sample users...
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: User): void {
    this.users = [...this.users, { ...user, id: Date.now().toString() }];
    this.usersSubject.next(this.users);
  }

  updateUser(user: User): void {
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
    this.usersSubject.next(this.users);
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((u) => u.id !== id);
    this.usersSubject.next(this.users);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
