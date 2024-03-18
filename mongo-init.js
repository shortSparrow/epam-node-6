db.createUser(
    {
        user: "root",
        pwd: "pass",
        roles: [
            {
                role: "readWrite",
                db: "my_db"
            }
        ]
    }
);

db.createCollection("users")