CREATE TABLE tokenized_cards (
    id SERIAL PRIMARY KEY,
    token VARCHAR(16) UNIQUE NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    cvv VARCHAR(3),
    expiration_month INT CHECK (expiration_month BETWEEN 1 AND 12),
    expiration_year INT CHECK (expiration_year BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '5 years'),
    email VARCHAR(255) NOT NULL
);

CREATE INDEX idx_token ON tokenized_cards(token);