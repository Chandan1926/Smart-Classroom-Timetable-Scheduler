const { Client } = require('pg');

module.exports = async function (context, req) {
    const client = new Client({
        connectionString: process.env.POSTGRES_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    try {
        // GET
        if (req.method === "GET") {
            const userId = req.headers['x-user-id'];
            const query = 'SELECT * FROM generated_timetables WHERE user_id = $1 ORDER BY created_at DESC';
            const res = await client.query(query, [userId]);
            context.res = { status: 200, body: res.rows };
        } 
        // POST
        else if (req.method === "POST") {
            const { user_id, timetable_data, optimization_score } = req.body;
            // Note: We removed config_id dependency for simplicity
            const query = `
                INSERT INTO generated_timetables (user_id, timetable_data, optimization_score)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const res = await client.query(query, [user_id, JSON.stringify(timetable_data), optimization_score]);
            context.res = { status: 201, body: res.rows[0] };
        }
        // DELETE
        else if (req.method === "DELETE") {
            const id = req.query.id;
            const query = 'DELETE FROM generated_timetables WHERE id = $1 RETURNING *';
            const res = await client.query(query, [id]);
            context.res = { status: 200, body: { message: "Deleted" } };
        }
    } catch (err) {
        context.res = { status: 500, body: "Error: " + err.message };
    } finally {
        await client.end();
    }
};