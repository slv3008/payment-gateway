import { tokenService } from '../services/tokenService';
import { validationService } from '../services/validationService';

interface CustomError extends Error {
    statusCode?: number;
}

interface CreateTokenEvent {
    body: string;
}

export const createToken = async (event: CreateTokenEvent) => {
  try {
 
    const requestData = JSON.parse(event.body);

    validationService.validateCardData(requestData);

    const token = await tokenService.tokenize(requestData);

    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };
  } catch (error) {
    if (error instanceof Error) {
      const customError = error as CustomError;
      return {
        statusCode: customError.statusCode || 500,
        body: JSON.stringify({ message: customError.message })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "An unexpected error occurred." })
      };
    }
  }
}
