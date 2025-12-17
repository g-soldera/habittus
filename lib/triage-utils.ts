export function validateBasicInfo(name: string, ageStr: string) {
  const age = parseInt(ageStr || '0', 10);
  if (!name || !name.trim()) return { valid: false, reason: 'Nome inválido' };
  if (Number.isNaN(age)) return { valid: false, reason: 'Idade inválida' };
  if (age < 18 || age > 100) return { valid: false, reason: 'Idade deve ser entre 18 e 100 anos' };
  return { valid: true };
}

export function validateBiometrics(heightCmStr: string, weightKgStr: string, bodyFatStr: string) {
  const height = parseInt(heightCmStr || '0', 10);
  const weight = parseInt(weightKgStr || '0', 10);
  const bodyFat = parseInt(bodyFatStr || '0', 10);

  if (Number.isNaN(height) || Number.isNaN(weight) || Number.isNaN(bodyFat)) {
    return { valid: false, reason: 'Dados biométricos inválidos' };
  }

  if (height < 100 || height > 250) return { valid: false, reason: 'Altura deve estar entre 100 e 250 cm' };
  if (weight < 30 || weight > 300) return { valid: false, reason: 'Peso deve estar entre 30 e 300 kg' };
  if (bodyFat < 5 || bodyFat > 50) return { valid: false, reason: 'Percentual de gordura deve estar entre 5 e 50%' };

  return { valid: true };
}
