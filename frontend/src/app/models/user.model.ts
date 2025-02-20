export interface Address {
  street: string;
  number: string;
  door: string;
  postalCode: string;
  city: string;
}

export interface Education {
  institutionName: string;
  degree: string;
  date: Date;
}

export interface WorkExperience {
  companyName: string;
  position: string;
  date: Date;
}

export interface BaseUser {
  id: string;
  documentId: string;
  firstName: string;
  lastName1: string;
  lastName2?: string;
  gender?: string;
  birthDate?: Date;
  address?: Address;
  type: 'applicant' | 'employee';
}

export interface Applicant extends BaseUser {
  type: 'applicant';
  education: Education[];
}

export interface Employee extends BaseUser {
  type: 'employee';
  workExperience: WorkExperience[];
}

export type User = Applicant | Employee;
