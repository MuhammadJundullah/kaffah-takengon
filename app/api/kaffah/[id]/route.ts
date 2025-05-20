import pool from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const {
      januari,
      februari,
      maret,
      april,
      mei,
      juni,
      juli,
      agustus,
      september,
      oktober,
      november,
      desember,
    } = body;

    await pool.query(
      `UPDATE kaffah SET 
        januari = $1, 
        februari = $2, 
        maret = $3, 
        april = $4, 
        mei = $5, 
        juni = $6, 
        juli = $7, 
        agustus = $8, 
        september = $9, 
        oktober = $10, 
        november = $11, 
        desember = $12
      WHERE id = $13`,
      [
        januari,
        februari,
        maret,
        april,
        mei,
        juni,
        juli,
        agustus,
        september,
        oktober,
        november,
        desember,
        params.id,
      ]
    );

    return new Response(JSON.stringify({ message: "Data updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
