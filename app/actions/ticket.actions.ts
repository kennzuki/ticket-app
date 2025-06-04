'use server';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/current-user';
export async function createTicket(
  prevState: { sucess: boolean; messsage: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to create a ticket',
      };
    }
    // Extracting form data
    const subject = formData.get('subject')?.toString() || ('' as string);
    const description =
      formData.get('description')?.toString() || ('' as string);
    const priority = formData.get('priority')?.toString() || ('Low' as string);

    //sending the form data to the backend
    await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
        user:{
          connect:{id:user.id}
        }
      },
    });

    //error in the form data
    if (!subject || !description || !priority) {
      return {
        success: false,
        message: 'Subject, description and priority are required',
      };
    }
    // Here you would typically send the data to your backend or API
    // For demonstration, we will just log it to the console
    revalidatePath('/tickets');
    return {
      success: true,
      message: 'Ticket created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: `${error} occured while creating the ticket'`,
    };
  }
}

export async function getTicket() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized You must be logged in to view tickets',
      };
      return[]
    }
    const tickets = await prisma.ticket.findMany({
      where: {
        user: {
          id: user.id
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tickets;
  } catch (error) {
    return {
      success: false,
      message: `${error} occured while adding the ticket`,
    };
  }
}

//get one ticket by id
export async function getTicketById(id: string) { 
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id:Number(id),
      },
    });
    return ticket;
  } catch (error) {
    return {
      success: false,
      message: `${error} occured while fetching the ticket`,
    };
  }
}
