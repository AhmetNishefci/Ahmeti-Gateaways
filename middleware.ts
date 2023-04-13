export { default } from 'next-auth/middleware'

// Routes that cannot be accessed without authentication
export const config = {
    matcher: [
        '/trips',
        '/reservations',
        '/properties',
        '/favorites'
    ]
}
