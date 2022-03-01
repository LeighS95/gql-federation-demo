export const authResolver = {
    Query: {
        user() {
            return { id: '1', username: '@user' }
        }
    },
    User: {
        __resolveReference(
            user: any,
            { fetchUserById }: any
        ) {
            return fetchUserById(user.id);
        }
    }
}