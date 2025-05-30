'use server'


export async function createTicket(formData:FormData) { 
    'use server'
    
    const subject = formData.get('subject')?.toString() || '' as string
    const description = formData.get('description')?.toString() || '' as string
    const priority = formData.get('priority')?.toString() || 'Low' as string
    
    // Here you would typically send the data to your backend or API
    // For demonstration, we will just log it to the console
    console.log('Ticket Created:', { subject, description, priority })
 return {
        success: true,
        message: 'Ticket created successfully'
    }
}