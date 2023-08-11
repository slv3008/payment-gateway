import { createToken } from '../../src/handlers/tokenization';
import { tokenService } from '../../src/services/tokenService';
import { validationService } from '../../src/services//validationService';

jest.mock('../services/tokenService');
jest.mock('../services/validationService');

describe('tokenización', () => {
  it('retorna un token para datos de tarjeta válidos', async () => {
    (validationService.validateCardData as jest.Mock).mockReturnValue(undefined);
    (tokenService.tokenize as jest.Mock).mockResolvedValue('testToken');
    
    const response = await createToken({
      body: JSON.stringify({
        cardNumber: '1234567812345678',
        cvv: '123',
        expirationMonth: '08',
        expirationYear: '2025',
        email: 'test@gmail.com'
      })
    });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('testToken');
  });

  it('retorna 400 para datos de tarjeta inválidos', async () => {
    (validationService.validateCardData as jest.Mock).mockImplementation(() => {
      throw { statusCode: 400, message: "Datos de tarjeta no válidos" };
    });
    
    const response = await createToken({
      body: JSON.stringify({
        cardNumber: 'invalidCardNumber',
        cvv: '123',
        expirationMonth: '13', // Mes inválido
        expirationYear: '2025',
        email: 'test@invalid.com'
      })
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain('Datos de tarjeta no válidos');
  });
});
