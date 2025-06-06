import { NextRequest } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest, context: any) {
  try {
    const { id } = context.params;

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
        id,
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

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { id } = context.params;

    await pool.query(`DELETE FROM kaffah WHERE id = $1`, [id]);

    return new Response(JSON.stringify({ message: "Data deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { name, tahun } = body;

    if (!name || !tahun) {
      return new Response(JSON.stringify({ error: "Field tidak lengkap" }), {
        status: 400,
      });
    }

    await pool.query(`UPDATE kaffah SET name = $1, tahun = $2 WHERE id = $3`, [
      name,
      tahun,
      id,
    ]);

    return new Response(JSON.stringify({ message: "Data berhasil diupdate" }), {
      status: 200,
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan server" }), {
      status: 500,
    });
  }
}
