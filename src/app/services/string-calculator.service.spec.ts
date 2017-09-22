import { StringCalculator } from './string-calculator.service';

describe('String Calculator Service', () => {
    let stringCalculator: StringCalculator;

    beforeEach(() => {
        stringCalculator = new StringCalculator();
    });

    const runTest = (input: any, expected: any) => {
        const actual = stringCalculator.add(input);

        expect(actual).toBe(expected);
    };

    describe('add() method', () => {
        it('returns 0, given an empty string', () => {
            const numbers = '';
            const expectedValue = 0;

            runTest(numbers, expectedValue);
        });

        it('returns 42, given the string "42"', () => {
            const numbers = '42';
            const expectedValue = 42;

            runTest(numbers, expectedValue);
        });

        it('returns 50, given the string "42,8"', () => {
            const numbers = '42,8';
            const expectedValue = 50;

            runTest(numbers, expectedValue);
        });

        it('returns 10, given the string "1,5,4"', () => {
            const numbers = '1,5,4';
            const expectedValue = 10;

            runTest(numbers, expectedValue);
        });

        it('should return the sum of the numbers, given an unknown list of comma-separated numbers', () => {
            const numbers = '1,5,4,6,7,8,100';
            const expectedValue = 131;

            runTest(numbers, expectedValue);
        });

        it('ignores numbers bigger than 1000', () => {
            const numbers = '300,150,1001,50,1000';
            const expectedValue = 1500;

            runTest(numbers, expectedValue);
        });

         it('can handle new lines between numbers, so it should return 6 given the string "1\\n2,3"', () => {
            const numbers = '1\n2,3';
            const expectedValue = 6;

            runTest(numbers, expectedValue);
        });

        describe('when the string contains negative numbers', () => {
            it('throws an instance of Error when the string contains at least one negative number', () => {
                const numbers = '1,-1,3';

                const addMethodWrapper = () => stringCalculator.add(numbers);

                expect(addMethodWrapper).toThrowError(Error);
            });

            it('throws an error with the message \'Negatives not allowed: -5\' given the string \'1,4,-5,6\'', () => {
                // Arrange
                const numbers = '1,4,-5,6';
                const expectedErrorMessage = 'Negatives not allowed: -5';

                const addMethodWrapper = () => stringCalculator.add(numbers);

                // Assert
                expect(addMethodWrapper).toThrowError(expectedErrorMessage);
            });

            it('throws an error listing all negative numbers that were found in the string', () => {
                const numbers = '-1,4,-42,6,-3';
                const expectedErrorMessage = 'Negatives not allowed: -1, -42, -3';

                const addMethodWrapper = () => stringCalculator.add(numbers);

                expect(addMethodWrapper).toThrowError(expectedErrorMessage);
            });

            it('throws an instance of Error when the string consists of only one negative number', () => {
                const numbers = '-99';

                const addMethodWrapper = () => stringCalculator.add(numbers);

                expect(addMethodWrapper).toThrowError(Error);
            });
        });

        describe('custom delimiters', () => {
            it('returns [1, 2, 4] given the string "//;\\n1;2;4"', () => {
                const numbers = '//;\n1;2;4';
                const expectedValue = 7;

                runTest(numbers, expectedValue);
            });
        });
    });
});
