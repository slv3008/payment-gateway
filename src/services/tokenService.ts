import * as redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

class TokenService {
  private static EXPIRATION_SECONDS = 900;  // 15 minutos

  /**
   * Genera un token único de 16 caracteres.
   */
  private generateUniqueToken(): string {
    return Math.random().toString(36).toUpperCase().substr(2, 16);
  }

  /**
   * Tokeniza los datos de la tarjeta y los guarda en Redis.
   * @param cardData Datos de la tarjeta.
   * @returns Token generado.
   */
  public async tokenize(cardData: any): Promise<string> {
    const token = this.generateUniqueToken();
    await setAsync(token, JSON.stringify(cardData), 'EX', TokenService.EXPIRATION_SECONDS);
    return token;
  }

  /**
   * Obtiene los datos de la tarjeta de Redis usando su token.
   * @param token Token a buscar.
   * @returns Datos de la tarjeta.
   * @throws Error si el token no se encuentra.
   */
  public async fetchCardByToken(token: string): Promise<any> {
    const cardDataString = await getAsync(token);
    if (!cardDataString) {
      throw new Error('Token no encontrado');
    }

    const cardData = JSON.parse(cardDataString);
    delete cardData.cvv;  // Es esencial no devolver el CVV por razones de seguridad.
    return cardData;
  }
}

export const tokenService = new TokenService();
