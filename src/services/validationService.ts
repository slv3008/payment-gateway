import { luhnCheck } from '../utils/luhnAlgorithm';

class ValidationService {
  /**
   * Valida los datos de la tarjeta.
   * @param cardData Objeto con los datos de la tarjeta.
   * @throws Error si la validación falla.
   */
  public validateCardData(cardData: any): void {
    if (!cardData) {
      throw { statusCode: 400, message: "Datos de la tarjeta no proporcionados" };
    }

    const {
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      email
    } = cardData;

    // Validación del algoritmo de LUHN
    if (!cardNumber || !luhnCheck(cardNumber)) {
      throw { statusCode: 400, message: "Número de tarjeta inválido" };
    }

    // Validación para CVV
    if (!cvv || (cvv.length !== 3 && cvv.length !== 4)) {
      throw { statusCode: 400, message: "CVV inválido" };
    }

    // Validación para el mes de expiración
    if (!expirationMonth || expirationMonth < 1 || expirationMonth > 12) {
      throw { statusCode: 400, message: "Mes de expiración inválido. Debe estar entre 1 y 12" };
    }

    // Validación para el año de expiración
    const currentYear = new Date().getFullYear();
    if (!expirationYear || expirationYear < currentYear || expirationYear > currentYear + 5) {
      throw { statusCode: 400, message: "Año de expiración inválido. No debe ser más de 5 años en el futuro" };
    }

    // Validación del dominio del correo electrónico
    const validEmailDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
    if (email) {
      const emailDomain = email.split('@')[1];
      if (!validEmailDomains.includes(emailDomain)) {
        throw { statusCode: 400, message: "Dominio de correo electrónico no válido" };
      }
    } else {
      throw { statusCode: 400, message: "Correo electrónico no proporcionado" };
    }
  }
}

export const validationService = new ValidationService();
