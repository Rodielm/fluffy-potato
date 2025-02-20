import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Applicant, Employee, WorkExperience } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
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

  get education(): FormArray {
    return this.userForm.get('education') as FormArray;
  }

  get workExperience(): FormArray {
    return this.userForm.get('workExperience') as FormArray;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const user = this.userService.getUserById(params['id']);
        console.log('user found: ', user);
        if (user) {
          this.userForm.patchValue(user);
          if (user.type == 'applicant') {
            this.setEducation((user as Applicant).education);
            this.workExperience.clear();
          }

          if (user.type == 'employee') {
            this.setWorkExperience((user as Employee).workExperience);
            this.education.clear();
          }

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
      id: [''],
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
        console.log('test', this.userForm);
        this.userService.updateUser(userData);
      } else {
        this.userService.addUser(userData);
      }
      this.userForm.patchValue(userData);
      this.router.navigate(['/users']);
    }
  }

  private setEducation(educationData: any[]): void {
    const educationArray = this.userForm.get('education') as FormArray;
    educationArray.clear();
    educationData.forEach((edu) => {
      educationArray.push(
        this.fb.group({
          institutionName: [edu.institutionName, Validators.required],
          degree: [edu.degree, Validators.required],
          date: [edu.date, Validators.required],
        })
      );
    });
  }

  private setWorkExperience(workExperienceData: WorkExperience[]): void {
    const workExpArray = this.userForm.get('workExperience') as FormArray;
    workExpArray.clear();

    if (workExperienceData) {
      workExperienceData.forEach((work) => {
        workExpArray.push(
          this.fb.group({
            companyName: [work.companyName, Validators.required],
            position: [work.position, Validators.required],
            date: [work.date, Validators.required],
          })
        );
      });
    }
  }

  addEducation() {
    const educationForm = this.fb.group({
      institutionName: ['', Validators.required],
      degree: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.education.push(educationForm);
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addWorkExperience() {
    const workExpForm = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.workExperience.push(workExpForm);
  }

  removeWorkExperience(index: number) {
    this.workExperience.removeAt(index);
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
