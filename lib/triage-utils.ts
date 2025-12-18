import { calculateTDEE, calculateTMB } from './biometric-calculator';

export function validateAge(age: number): { valid: boolean; message?: string } {
  if (Number.isNaN(age)) return { valid: false, message: 'Idade inválida' };
  if (age < 18) return { valid: false, message: 'Idade mínima é 18 anos' };
  if (age > 100) return { valid: false, message: 'Idade máxima é 100 anos' };
  return { valid: true };
}

export function validateBiometrics(heightCm: number, weightKg: number, bodyFatPercent: number) {
  if (Number.isNaN(heightCm) || Number.isNaN(weightKg) || Number.isNaN(bodyFatPercent)) {
    return { valid: false, message: 'Medições inválidas' };
  }
  if (heightCm < 100 || heightCm > 250) return { valid: false, message: 'Altura deve estar entre 100 e 250 cm' };
  if (weightKg < 30 || weightKg > 300) return { valid: false, message: 'Peso deve estar entre 30 e 300 kg' };
  if (bodyFatPercent < 5 || bodyFatPercent > 50) return { valid: false, message: 'Percentual de gordura deve estar entre 5 e 50%' };
  return { valid: true };
}

export function estimateTmbTdee(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  trainingFrequency: number
) {
  const tmb = calculateTMB(weightKg, heightCm, age, gender);
  const activityLevel = trainingFrequency > 3 ? 'active' : trainingFrequency > 0 ? 'moderate' : 'sedentary';
  const tdee = calculateTDEE(tmb, activityLevel as any);
  return { tmb, tdee, activityLevel };
}

export default {
  validateAge,
  validateBiometrics,
  estimateTmbTdee,
};
