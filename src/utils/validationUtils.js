export function validateField(value, rules = {}) {
  const errors = [];
  const isEmpty = value === undefined || value === null || value === '';

  if (rules.required && isEmpty) {
    errors.push('Ce champ est requis');
  }

  if (!isEmpty && typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum ${rules.minLength} caractères`);
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Maximum ${rules.maxLength} caractères`);
    }
  }

  if (!isEmpty && typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      errors.push(`Valeur minimum: ${rules.min}`);
    }
    if (rules.max !== undefined && value > rules.max) {
      errors.push(`Valeur maximum: ${rules.max}`);
    }
  }

  return errors;
}

export function parseStringList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  return value
    .split(/[\n,]/)
    .map(s => s.trim())
    .filter(Boolean);
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
