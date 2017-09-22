export class NumberParser {
    parse(rawNumbers: string): Array<number> {
        const numbersInfo = this.analyzeNumberExpression(rawNumbers);

        const extractedRawNumbers = numbersInfo.rawNumbersSegment.split(numbersInfo.delimiter);

        return extractedRawNumbers.map(rawNumber => parseInt(rawNumber, 10));
    }

    private analyzeNumberExpression(numberExpression: string): NumberExpressionInfo {
        let delimiter: RegExp;
        let rawNumbersSegment: string;

        if (numberExpression.startsWith('//')) {
            const [expression, numbersToExtract] = numberExpression.split('\n');

            const expressionWithoutHeader = expression.substring('//'.length);

            if (expressionWithoutHeader.startsWith('[')) {
                const customDelimiterBlockPattern = /\[([^\]]+)\]/g;
                const delimiterMatches = expressionWithoutHeader.match(customDelimiterBlockPattern);

                let numberDelimiter;
                if (delimiterMatches) {
                    numberDelimiter = delimiterMatches
                        .map(d => this.unwrapDelimiter(d))
                        .map(d => this.escapeDelimiterForRegex(d))
                        .join('|');
                } else {
                    numberDelimiter = this.unwrapDelimiter(expressionWithoutHeader);
                }

                delimiter = new RegExp(numberDelimiter, 'g');
                rawNumbersSegment = numbersToExtract;

            } else {
                delimiter = new RegExp('\\' + expressionWithoutHeader[0], 'g');
                rawNumbersSegment = numbersToExtract;
            }
        } else {
            delimiter = new RegExp('[,\\n]', 'g');
            rawNumbersSegment = numberExpression;
        }

        const numberExpressionInfo: NumberExpressionInfo = {
            delimiter: delimiter,
            rawNumbersSegment: rawNumbersSegment
        };

        return numberExpressionInfo;
    }

    private escapeDelimiterForRegex(delimiter: string): string {
        return delimiter.split('').map(s => '\\' + s).join('');
    }

    private unwrapDelimiter(delimiter: string): string {
        return delimiter.replace(/\[|\]/g, '');
    }
}

class NumberExpressionInfo {
    delimiter: RegExp;
    rawNumbersSegment: string
}
