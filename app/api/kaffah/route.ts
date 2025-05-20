import pool from "@/lib/db";

export async function GET() {
  try {
    // Query untuk mendapatkan semua data dari tabel kaffah
    const kaffahResult = await pool.query(
      "SELECT * FROM kaffah ORDER BY tahun DESC"
    );

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, tahun } = body;

    if (!name || !tahun) {
      return new Response(
        JSON.stringify({ error: "Name dan Tahun wajib diisi." }),
        {
          status: 400,
        }
      );
    }

    await pool.query("INSERT INTO kaffah (name, tahun) VALUES ($1, $2)", [
      name,
      tahun,
    ]);

    return new Response(
      JSON.stringify({ message: "Data berhasil ditambahkan." }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: "Gagal menambah data." }), {
      status: 500,
    });
  }
}