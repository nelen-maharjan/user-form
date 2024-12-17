import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already taken" }),
        { status: 409 } 
      );
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    return new Response(JSON.stringify(user), { status: 201 });

  } catch (error) {
    console.error("Error creating user:", error);

    return new Response(
      JSON.stringify({ error: "Error creating user. Please try again." }),
      { status: 500 }
    );
  }
}
