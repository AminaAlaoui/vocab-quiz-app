import { Word } from '../types';

export const words: Word[] = [
  // 🍎 Food
  { id: '1', english: 'Apple', spanish: 'Manzana', category: 'Food', difficulty: 'beginner', pronunciation: 'AP-ul' },
  { id: '2', english: 'Bread', spanish: 'Pan', category: 'Food', difficulty: 'beginner', pronunciation: 'BRED' },
  { id: '3', english: 'Water', spanish: 'Agua', category: 'Food', difficulty: 'beginner', pronunciation: 'WAH-ter' },
  { id: '4', english: 'Chicken', spanish: 'Pollo', category: 'Food', difficulty: 'beginner', pronunciation: 'CHIK-en' },
  { id: '5', english: 'Rice', spanish: 'Arroz', category: 'Food', difficulty: 'beginner', pronunciation: 'RYSS' },

  // 🌍 Travel
  { id: '6', english: 'Airport', spanish: 'Aeropuerto', category: 'Travel', difficulty: 'intermediate', pronunciation: 'AIR-port' },
  { id: '7', english: 'Hotel', spanish: 'Hotel', category: 'Travel', difficulty: 'beginner', pronunciation: 'hoh-TEL' },
  { id: '8', english: 'Passport', spanish: 'Pasaporte', category: 'Travel', difficulty: 'intermediate', pronunciation: 'PASS-port' },
  { id: '9', english: 'Luggage', spanish: 'Equipaje', category: 'Travel', difficulty: 'intermediate', pronunciation: 'LUG-ij' },
  { id: '10', english: 'Ticket', spanish: 'Boleto', category: 'Travel', difficulty: 'beginner', pronunciation: 'TIK-et' },

  // 💼 Business
  { id: '11', english: 'Meeting', spanish: 'Reunión', category: 'Business', difficulty: 'intermediate', pronunciation: 'MEE-ting' },
  { id: '12', english: 'Contract', spanish: 'Contrato', category: 'Business', difficulty: 'advanced', pronunciation: 'KON-trakt' },
  { id: '13', english: 'Invoice', spanish: 'Factura', category: 'Business', difficulty: 'advanced', pronunciation: 'IN-voys' },
  { id: '14', english: 'Deadline', spanish: 'Fecha límite', category: 'Business', difficulty: 'intermediate', pronunciation: 'DED-layn' },
  { id: '15', english: 'Salary', spanish: 'Salario', category: 'Business', difficulty: 'intermediate', pronunciation: 'SAL-uh-ree' },

  // 🏥 Health
  { id: '16', english: 'Doctor', spanish: 'Médico', category: 'Health', difficulty: 'beginner', pronunciation: 'DOK-ter' },
  { id: '17', english: 'Hospital', spanish: 'Hospital', category: 'Health', difficulty: 'beginner', pronunciation: 'HOS-pi-tal' },
  { id: '18', english: 'Medicine', spanish: 'Medicina', category: 'Health', difficulty: 'intermediate', pronunciation: 'MED-i-sin' },
  { id: '19', english: 'Symptom', spanish: 'Síntoma', category: 'Health', difficulty: 'advanced', pronunciation: 'SIMP-tom' },
  { id: '20', english: 'Pharmacy', spanish: 'Farmacia', category: 'Health', difficulty: 'intermediate', pronunciation: 'FAR-muh-see' },

  // 🎓 Education
  { id: '21', english: 'Teacher', spanish: 'Profesor', category: 'Education', difficulty: 'beginner', pronunciation: 'TEE-cher' },
  { id: '22', english: 'Homework', spanish: 'Tarea', category: 'Education', difficulty: 'beginner', pronunciation: 'HOHM-wurk' },
  { id: '23', english: 'Exam', spanish: 'Examen', category: 'Education', difficulty: 'beginner', pronunciation: 'ig-ZAM' },
  { id: '24', english: 'Library', spanish: 'Biblioteca', category: 'Education', difficulty: 'intermediate', pronunciation: 'LY-brer-ee' },
  { id: '25', english: 'Scholarship', spanish: 'Beca', category: 'Education', difficulty: 'advanced', pronunciation: 'SKOL-er-ship' },
];

export const categories = [...new Set(words.map(w => w.category))];
export const difficulties = ['beginner', 'intermediate', 'advanced'] as const;