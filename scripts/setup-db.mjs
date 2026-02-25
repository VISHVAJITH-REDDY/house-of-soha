import postgres from "postgres";

const DB_PASSWORD = process.argv[2];

if (!DB_PASSWORD) {
  console.error("Usage: node scripts/setup-db.mjs YOUR_DB_PASSWORD");
  process.exit(1);
}

const sql = postgres({
  host: "db.wayxnkxgoumrrbyovdpc.supabase.co",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: DB_PASSWORD,
  ssl: "require",
});

try {
  console.log("Connecting to Supabase...");

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
      created_at    timestamptz DEFAULT now(),
      name          text        NOT NULL,
      phone         text        NOT NULL,
      email         text,
      service       text,
      preferred_date text,
      time_slot     text,
      notes         text,
      source        text        DEFAULT 'chat',
      status        text        DEFAULT 'pending'
    );
  `;

  console.log("✅ bookings table created successfully!");

  // Verify
  const rows = await sql`SELECT COUNT(*) FROM bookings`;
  console.log("✅ Table verified — current row count:", rows[0].count);

} catch (err) {
  console.error("❌ Error:", err.message);
} finally {
  await sql.end();
}
