'use server';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
export async function createTicket(
  prevState: { sucess: boolean; messsage: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
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
    const tickets = await prisma.ticket.findMany({
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
