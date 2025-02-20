import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  mode: 'new' | 'edit' | 'view' = 'new';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const user = this.userService.getUserById(params['id']);
        if (user) {
          this.userForm.patchValue(user);
          this.mode =
            this.route.snapshot.url[2]?.path === 'view' ? 'view' : 'edit';
          if (this.mode === 'view') {
            this.userForm.disable();
          }
        }
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      documentId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName1: ['', Validators.required],
      lastName2: [''],
      gender: [''],
      birthDate: [''],
      type: ['applicant'],
      address: this.fb.group({
        street: [''],
        number: [''],
        door: [''],
        postalCode: [''],
        city: [''],
      }),
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.mode === 'edit') {
        this.userService.updateUser(userData);
      } else {
        this.userService.addUser(userData);
      }
      this.router.navigate(['/users']);
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
