interface DoctorFormData {
  name: string;
  email: string;
  mobile: string;
  specialization: string;
  experience: number;
  dob: string;
  eachSlotDuration: number;
  allowLessThanDurationSlot: boolean;
  availableDays: string[];
  availableTimings: {
    start: string;
    end: string;
  }[];
  image: string;
  languages: string[];
  qualifications: string[];
  awards: string[];
  about: string;
  consultationFee: number;
  registrationNumber: string;
}
