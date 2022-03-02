export const accounts = [
    {
        id: "1",
        name: "admin",
        email: "admin@email.com",
        password: "admin",
        roles: ["admin"],
        permissions: [
            "read:any_account", "read:own_account"
        ]
    },
    {
        id: "2",
        name: "user1",
        email: "user1@email.com",
        password: "user1",
        roles: ["user"],
        permissions: ["read:own_account"]
    },
    {
        id: "3",
        name: "user2",
        email: "user2@email.com",
        password: "user2",
        roles: ["user"],
        permissions: ["read:own_account"]
    }
]