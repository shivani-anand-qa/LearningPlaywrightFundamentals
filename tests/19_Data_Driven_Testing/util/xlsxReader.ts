import ExcelJS from 'exceljs';
import * as path from 'path';

export interface RegistrationData {
    description: string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    shouldPass: boolean;
    expectedError: string;
}

export async function readXLSX(filePath: string): Promise<RegistrationData[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.resolve(filePath));
    const worksheet = workbook.worksheets[0];

    const headers: string[] = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
        headers[colNumber - 1] = cell.text;
    });

    const data: RegistrationData[] = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const record: any = {};
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            record[headers[colNumber - 1]] = cell.text;
        });
        record.shouldPass = record.shouldPass === 'true';
        data.push(record as RegistrationData);
    });

    return data;
}
