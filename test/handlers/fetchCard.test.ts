import { fetchCard } from '../../src/handlers/fetchCard';
import { tokenService } from '../../src/services/tokenService';

jest.mock('../services/tokenService');

describe('fetchCard', () => {
  it('retorna datos de la tarjeta para un token válido', async () => {
    (tokenService.fetchCardByToken as jest.Mock).mockResolvedValue({
      cardNumber: '1234567812345678',
      expirationMonth: '08',
      expirationYear: '2025'
    });
    
    const response = await fetchCard({ pathParameters: { token: 'testToken' } });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('1234567812345678');
  });

  it('retorna 404 para un token inválido', async () => {
    (tokenService.fetchCardByToken as jest.Mock).mockResolvedValue(null);

    const response = await fetchCard({ pathParameters: { token: 'invalidToken' } });

    expect(response.statusCode).toBe(404);
    expect(response.body).toContain('Tarjeta no encontrada');
  });
});

