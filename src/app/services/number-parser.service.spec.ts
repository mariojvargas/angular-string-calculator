import { NumberParser } from './number-parser.service';

describe('Number Parser Service', () => {
    let numberParser: NumberParser;

    beforeEach(() => {
         numberParser = new NumberParser();
    });

    const runTest = (numbers: string, expected: Array<number>) => {
        const actual = numberParser.parse(numbers);

        expect(actual).toEqual(expected);
    };

    describe('custom delimiters', () => {
        it('returns [1, 2, 4] given the string "//;\\n1;2;4"', () => {
            runTest('//;\n1;2;4', [1, 2, 4]);
        });

        it('extracts numbers given a delimiter of any length', () => {
            runTest('//[***]\n1***2***3', [1, 2, 3]);
        });

        xit('extracts numbers given multiple single-character delimiters', () => {
            runTest('//[*][%]\n11*22%33', [11, 22, 33]);
        });
    });
});
