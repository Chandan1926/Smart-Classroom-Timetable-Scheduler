const { Client } = require('pg');

module.exports = async function (context, req) {
    const client = new Client({
        connectionString: process.env.POSTGRES_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        // LOGIN (POST)
        if (req.method === "POST") {
            const { email, password } = req.body;
            // Fetch user matching email and password
            const query = 'SELECT id, full_name, institution_name FROM profiles WHERE id = $1 AND password = $2';
            const res = await client.query(query, [email, password]);

            if (res.rows.length > 0) {
                context.res = { status: 200, body: res.rows[0] };
            } else {
                context.res = { status: 401, body: "Invalid email or password" };
            }
        } 

        // SIGNUP (PUT)
        else if (req.method === "PUT") {
            const { email, password, full_name, institution_name } = req.body;

            // Check if user exists
            const checkQuery = 'SELECT id FROM profiles WHERE id = $1';
            const checkRes = await client.query(checkQuery, [email]);

            if (checkRes.rows.length > 0) {
                context.res = { status: 409, body: "User already exists" };
                return;
            }

            // Insert new user
            const insertQuery = `
                INSERT INTO profiles (id, password, full_name, institution_name)
                VALUES ($1, $2, $3, $4)
                RETURNING id, full_name, institution_name;
            `;
            const res = await client.query(insertQuery, [email, password, full_name, institution_name]);

            context.res = { status: 201, body: res.rows[0] };
        }
    } catch (err) {
        context.res = { status: 500, body: "Database error: " + err.message };
    } finally {
        await client.end();
    }
};