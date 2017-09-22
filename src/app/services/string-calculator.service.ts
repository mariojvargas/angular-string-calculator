import { NumberParser } from './number-parser.service';

const MAXIMUM_SUPPORTED_NUMBER = 1000;

export class StringCalculator {
    private numbersParser = new NumberParser();
    private noNegativesRule = new NoNegativeNumbersValidationRule();
    private internalCalculator = new NumberCalculator();

    add(numbersToAdd: string): number {
        if (numbersToAdd === '') {
            return 0;
        }

        const numbers = this.numbersParser.parse(numbersToAdd).filter(n => n <= MAXIMUM_SUPPORTED_NUMBER);
        this.noNegativesRule.validate(numbers);

        return this.internalCalculator.sum(numbers);
    }
}

class NoNegativeNumbersValidationRule {
    validate(numbers: Array<number>): void {
        const negativeNumbers = numbers.filter(n => n < 0);

        if (negativeNumbers.length > 0) {
            const commaDelimitedNegativeNumbers = negativeNumbers.join(', ');
            throw new Error(`Negatives not allowed: ${commaDelimitedNegativeNumbers}`);
        }
    }
}

class NumberCalculator {
    add(a: number, b: number): number {
        return a + b;
    }

    sum(numbers: Array<number>): number {
        return numbers.reduce(this.add);
    }
}
