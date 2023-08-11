import { query } from '../services/db'; 

class TokenService {
  private static EXPIRATION_SECONDS = 900;  // 15 minutos

  /**
   * Genera un token único de 16 caracteres.
   */
  private generateUniqueToken(): string {
    return Math.random().toString(36).toUpperCase().substr(2, 16);
  }

  /**
   * Tokeniza los datos de la tarjeta y los guarda en la base de datos.
   * @param cardData Datos de la tarjeta.
   * @returns Token generado.
   */
  public async tokenize(cardData: any): Promise<string> {
    const token = this.generateUniqueToken();
    await query(
      `INSERT INTO tokenized_cards (token, card_number, cvv, expiration_month, expiration_year, email)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [token, cardData.cardNumber, cardData.cvv, cardData.expirationMonth, cardData.expirationYear, cardData.email]
    );
    return token;
  }

  /**
   * Obtiene los datos de la tarjeta de la base de datos usando su token.
   * @param token Token a buscar.
   * @returns Datos de la tarjeta.
   * @throws Error si el token no se encuentra.
   */
  public async fetchCardByToken(token: string): Promise<any> {
    const result = await query(
      `SELECT card_number, expiration_month, expiration_year, email
       FROM tokenized_cards
       WHERE token = $1 AND CURRENT_TIMESTAMP < expiration`,
      [token]
    );
    if (result.rows.length === 0) {
      throw new Error('Token no encontrado');
    }
    return result.rows[0];
  }
}

export const tokenService = new TokenService();
