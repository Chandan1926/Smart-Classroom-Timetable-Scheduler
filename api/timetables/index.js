const { Client } = require('pg');

module.exports = async function (context, req) {
    // 1. Connect to the Database
    // Azure provides this connection string via "Environment Variables" setting
    const client = new Client({
        connectionString: process.env.POSTGRES_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        // 2. Handle GET Requests (Fetch user's timetables)
        if (req.method === "GET") {
            // Get the User ID from the header (sent by your Frontend)
            const userId = req.headers['x-user-id']; 

            if (!userId) {
                context.res = { status: 400, body: "Missing User ID" };
                return;
            }

            // Run SQL Query
            const query = 'SELECT * FROM generated_timetables WHERE user_id = $1 ORDER BY created_at DESC';
            const res = await client.query(query, [userId]);

            // Return Data
            context.res = {
                status: 200,
                body: res.rows
            };
        } 

        // 3. Handle POST Requests (Save a new timetable)
        else if (req.method === "POST") {
            const { user_id, timetable_data, optimization_score } = req.body;

            if (!user_id || !timetable_data) {
                context.res = { status: 400, body: "Missing required fields" };
                return;
            }

            // Run SQL Insert
            const query = `
                INSERT INTO generated_timetables (user_id, timetable_data, optimization_score)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const values = [user_id, JSON.stringify(timetable_data), optimization_score];
            const res = await client.query(query, values);

            // Return Success
            context.res = {
                status: 201,
                body: res.rows[0]
            };
        }
    } catch (err) {
        context.log.error("Database Error:", err);
        context.res = {
            status: 500,
            body: "Database error: " + err.message
        };
    } finally {
        // 4. Always close the connection
        await client.end();
    }
};