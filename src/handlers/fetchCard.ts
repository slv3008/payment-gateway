import { tokenService } from '../services/tokenService';

interface CustomError extends Error {
    statusCode?: number;
}

interface PathParameters {
    token: string;
}

interface FetchCardEvent {
    pathParameters: PathParameters;
}

export const fetchCard = async (event: FetchCardEvent) => {
    try {
        const { token } = event.pathParameters;
        const cardData = await tokenService.fetchCardByToken(token);

        if (!cardData) {
            throw { statusCode: 404, message: "Tarjeta no encontrada" };  
        }

        return {
            statusCode: 200,
            body: JSON.stringify(cardData)
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
