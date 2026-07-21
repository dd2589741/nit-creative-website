export interface Equipment {
  id: string;
  name: string;
  category: 'Instrument' | 'Trainer Kit' | 'Software' | 'Component';
  quantity: number;
  status: 'Functional' | 'Maintenance' | 'Faulty';
  location: string;
}

export interface Laboratory {
  id: string;
  name: string;
  code: string;
  roomNo: string;
  facultyInCharge: string;
  technician: string;
  description: string;
  experimentsCount: number;
  equipment: Equipment[];
}

export interface LabBooking {
  id: string;
  studentName: string;
  rollNo: string;
  labId: string;
  workbenchNo: string;
  date: string;
  timeSlot: string;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Completed';
  createdAt: string;
}

export interface EquipmentIssue {
  id: string;
  reporterName: string;
  labId: string;
  equipmentName: string;
  workbenchNo: string;
  issueDescription: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Reported' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface Experiment {
  id: string;
  courseCode: string;
  courseName: string;
  expNo: number;
  title: string;
  objective: string;
  apparatus: string[];
  theory: string;
  procedure: string[];
  circuitDiagramUrl?: string;
  simulationType?: 'oscilloscope' | 'logic-gates' | 'none';
}
