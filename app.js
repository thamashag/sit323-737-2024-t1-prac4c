const express = require('express');
const app = express();
const winston = require('winston');

// Create Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Addition endpoint
app.get('/add', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid input. Please provide valid numbers.');
        }

        const result = num1 + num2;
        res.json({ result });

        logger.info('Addition operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid input. Please provide valid numbers.');
        }

        const result = num1 - num2;
        res.json({ result });

        logger.info('Subtraction operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid input. Please provide valid numbers.');
        }

        const result = num1 * num2;
        res.json({ result });

        logger.info('Multiplication operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

// Division endpoint
app.get('/divide', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid input. Please provide valid numbers.');
        }

        if (num2 === 0) {
            throw new Error('Division by zero is not allowed.');
        }

        const result = num1 / num2;
        res.json({ result });

        logger.info('Division operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

// Exponentiation endpoint
app.get('/exponentiate', (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exponent = parseFloat(req.query.exponent);
        if (isNaN(base) || isNaN(exponent)) {
            throw new Error('Invalid input. Base and exponent must be numbers.');
        }
        const result = Math.pow(base, exponent);
        res.json({ result });
        logger.info('Exponentiation operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});


// Square root endpoint
app.get('/sqrt', (req, res) => {
    try {
        const number = parseFloat(req.query.num1);
        if (isNaN(number) || number < 0) {
            throw new Error('Invalid input. Number must be a non-negative number.');
        }
        const result = Math.sqrt(number);
        res.json({ result });
        logger.info('Square root operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});


// Modulo endpoint
app.get('/modulo', (req, res) => {
    try {
        const dividend = parseFloat(req.query.dividend);
        const divisor = parseFloat(req.query.divisor);
        if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
            throw new Error('Invalid input. Dividend and divisor must be numbers, and divisor must not be zero.');
        }
        const result = dividend % divisor;
        res.json({ result });
        logger.info('Modulo operation completed');
    } catch (err) {
        logger.error(err.message);
        res.status(400).json({ error: err.message });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
