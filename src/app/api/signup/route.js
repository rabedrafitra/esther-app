
import bcrypt from 'bcrypt';
import prisma from "../../../utils/connect";
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
    

      const infos = await req.json();
      
      console.log(infos);

      const addName = infos.username;
      const addEmail = infos.email;
      const addPassword = infos.password;

    
      if (!addName || !addEmail || !addPassword) {
        return NextResponse.json({ message: 'Des champs sont manquants' }, { status: 400 });
      }
    
      try {
        const exist = await prisma.user.findUnique({
          where: {
           email: addEmail,
          },
        });
    
        if (exist) {
          return NextResponse.json({ message: 'Email déjà utilisé' }, { status: 400 });
        }
    
        const TheHasedPassword = await bcrypt.hash(addPassword, 10);
    
        const user = await prisma.user.create({
          data: {
            name : addName,
            email : addEmail,
            hashedPassword : TheHasedPassword,
            image: '/noavatar.png'
          },
        });
    
        return NextResponse.json(user, { status: 201 });
      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error.message);
        return NextResponse.json({ message: 'Une erreur est survenue lors de l\'inscription' }, { status: 500 });
      }
    }