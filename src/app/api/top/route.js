import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const topPosts = await prisma.post.findMany({
      orderBy: {
        views: "desc"
      },
       take: 4,
      // Incluez les relations user et cat
      include: {
        user: true,
        cat: true
      }
    });

    console.log(topPosts);

    return new NextResponse(JSON.stringify(topPosts), { status: 200 });
  } catch (err) {
    console.error("Error fetching top posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
