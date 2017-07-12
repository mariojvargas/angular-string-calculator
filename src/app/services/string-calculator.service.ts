export class StringCalculator {
    add(numbersToAdd: string): number {
        if (numbersToAdd === '') {
            return 0;
        }

        if (!numbersToAdd.includes(',')) {
            parseInt(numbersToAdd, 10);
        }

        const numbers = numbersToAdd.split(/\n|,/)
                .map(x => parseInt(x, 10))
                .filter(n => n <= 1000);

        const negativeNumbers = numbers.filter(n => n < 0);
        if (negativeNumbers.length > 0) {
            const commaDelimitedNegativeNumbers = negativeNumbers.join(', ');
            throw new Error(`Negatives not allowed: ${commaDelimitedNegativeNumbers}`);
        }

        return numbers.reduce((previous, current) => previous + current);
    }
}
