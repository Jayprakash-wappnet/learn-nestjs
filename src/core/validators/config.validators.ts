import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';
import { Environments } from '../constants';

class EnvironmentVariables {
    @IsNumber()
    @IsOptional()
    APP_PORT?: number;

    @IsString()
    @IsNotEmpty()
    APP_NAME: string;

    @IsEnum(Environments)
    @IsOptional()
    NODE_ENV: Environments;

    @IsString()
    @IsNotEmpty()
    DB_HOST: string;

    @IsNumber()
    @IsNotEmpty()
    DB_PORT: number;

    @IsString()
    @IsNotEmpty()
    DB_USERNAME: string;

    @IsString()
    @IsOptional()
    DB_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    DB_NAME: string;

    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;
}

export function validateConfigs(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        const errorMessages = errors.flatMap((err) => Object.values(err.constraints || {})).join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
    }

    return validatedConfig;
}
