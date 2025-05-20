import pool from "@/lib/db";

export async function GET() {
    try {
        // Query untuk mendapatkan semua data dari tabel kaffah
        const kaffahResult = await pool.query("SELECT * FROM kaffah");

        // Query untuk mendapatkan tahun secara distinct
        const tahunResult = await pool.query("SELECT DISTINCT tahun FROM kaffah");

        return new Response(
            JSON.stringify({
                kaffahData: kaffahResult.rows,
                tahunData: tahunResult.rows.map((row: { tahun: string }) => row.tahun),
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}
