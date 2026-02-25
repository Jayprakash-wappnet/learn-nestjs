export const appConfig = () => ({
    app: {
        port: parseInt(process.env.PORT ?? '3000'),
        environment: process.env.NODE_ENV ?? 'development',
        name: process.env.APP_NAME ?? 'NestJS',
        jwtSecret: process.env.JWT_SECRET,
    }
})