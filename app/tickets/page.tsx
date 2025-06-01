import { getTicket } from "../actions/ticket.actions"

const TicketPage = async () => {
  const tickets = await getTicket()
  console.log( tickets);
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      
    </div>
  )
}

export default TicketPage