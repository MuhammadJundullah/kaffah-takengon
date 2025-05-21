import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db"
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("CREDENTIALS >>>", credentials);

        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        try {
          const query =
            "SELECT id, name, email, password FROM users WHERE email = $1";
          const values = [email];

          const result = await pool.query(query, values);

          if (result.rows.length > 0) {
            const user = result.rows[0];

            const isPasswordValid = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordValid) {
              return { id: user.id, name: user.name, email: user.email };
            } else {
              throw new Error("Email atau password salah");
            }
          } else {
            throw new Error("Email atau password salah");
          }
        } catch (error) {
          console.error("Database error:", error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };
