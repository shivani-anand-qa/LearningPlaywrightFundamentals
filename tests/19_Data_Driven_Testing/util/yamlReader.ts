import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface RegistrationData {
    description: string;
    name: string;
    username: string;
    password: string;
    confirmPassword?: string;
    shouldPass: boolean;
    expectedError: string;
}

export function readYAML(filePath: string): RegistrationData[] {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return yaml.load(content) as RegistrationData[];
}
