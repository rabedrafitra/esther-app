
import { getAuthSession } from "../../../utils/auth";
import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1; // Par défaut, la page est 1
  const cat = searchParams.get("cat");
  const searchTerm = searchParams.get("search");

  const POST_PER_PAGE = 4;

  const skip = POST_PER_PAGE * (page - 1);

  const query = {
    take: POST_PER_PAGE,
    skip: skip,
    where: {
      ...(cat && { catSlug: cat }),
      ...(searchTerm && { 
        title: { 
          startsWith: searchTerm.toLowerCase(), 
        } 
      }), 
    },
    orderBy: {
      createdAt: 'desc' // Trie par date de création décroissante
    }
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }
console.log(session.user.name);

  // Récupérer l'utilisateur à partir de la session
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  // Vérifier si l'utilisateur existe et si emailVerified est null
  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: "Compte non vérifié!" }, { status: 408 })
    );
  }


  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};



// DELETE A POST
export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const { id } = await req.json();
    const post = await prisma.post.findUnique({
      where: { id },
      select: { userEmail: true }, // Select the userEmail to verify ownership
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "post not found!" }, { status: 404 })
      );
    }

    // Check if the logged-in user is the owner of the post
    if (post.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "You are not authorized to delete this post!" }, { status: 403 })
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });

    return new NextResponse(
      JSON.stringify({ message: "post deleted successfully" }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
