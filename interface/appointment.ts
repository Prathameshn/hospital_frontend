export interface IPatientDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IAppointmentTime {
  startTime: string;
  endTime: string;
}

export interface T {
  [key: string]: unknown;
}

export interface IAppointment {
  _id: string;
  doctor: string;
  patientDetails: IPatientDetails;
  appointmentTime: IAppointmentTime;
  appointmentDate: string;
  appointmentStatus: string;
  notes: string;
  appointmentHistory: T[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
