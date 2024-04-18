import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const filename = `${timestamp}_${file.name.replaceAll(" ", "_")}`;
  const filePath = path.join(process.cwd(), "public/uploads/", filename);
  
  try {
    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${filename}`; // Assuming "public" is served statically
    return NextResponse.json({ message: "Success", url: fileUrl, status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};
