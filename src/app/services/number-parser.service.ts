const HeaderStartSymbol = '//';
const HeaderAndNumbersSeparator = '\n';

export class NumberParser {
    parse(rawNumbers: string): Array<number> {
        const numbersInfo = this.analyzeNumberExpression(rawNumbers);

        const extractedRawNumbers = numbersInfo.rawNumbersSegment.split(numbersInfo.delimiter);

        return extractedRawNumbers.map(rawNumber => parseInt(rawNumber, 10));
    }

    private analyzeNumberExpression(numberExpression: string): NumberExpressionInfo {
        let delimiter: RegExp;
        let rawNumbersSegment: string;

        if (numberExpression.startsWith(HeaderStartSymbol)) {
            const [headerInfo, numbersToExtract] = numberExpression.split(HeaderAndNumbersSeparator);
            rawNumbersSegment = numbersToExtract;

            const customDelimiterExpression = headerInfo.substring(HeaderStartSymbol.length);

            if (customDelimiterExpression.startsWith('[')) {
                delimiter = this.buildCustomDelimiterBlockPattern(customDelimiterExpression);

            } else {
                delimiter = this.buildCustomDelimiterWithoutBlockPattern(customDelimiterExpression);
            }
        } else {
            delimiter = this.buildDefaultDelimiterPattern();
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

    private buildCustomDelimiterBlockPattern(customDelimiterExpression: string): RegExp {
        const customDelimiterBlockPattern = /\[([^\]]+)\]/g;
        const delimiterMatches = customDelimiterExpression.match(customDelimiterBlockPattern);

        let numberDelimiter;
        if (delimiterMatches) {
            numberDelimiter = delimiterMatches
                .map(delimiter => this.escapeDelimiterForRegex(this.unwrapDelimiter(delimiter)))
                .join('|');
        } else {
            numberDelimiter = this.unwrapDelimiter(customDelimiterExpression);
        }

        return new RegExp(numberDelimiter, 'g');
    }

    private buildCustomDelimiterWithoutBlockPattern(customDelimiterExpression: string): RegExp {
        customDelimiterExpression = this.escapeDelimiterForRegex(customDelimiterExpression[0]);

        return new RegExp(customDelimiterExpression, 'g');
    }

    private buildDefaultDelimiterPattern(): RegExp {
        return /[,\n]/g;
    }
}

class NumberExpressionInfo {
    delimiter: RegExp;
    rawNumbersSegment: string
}
