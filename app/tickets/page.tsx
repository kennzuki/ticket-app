import Link from 'next/link';
import { getTicket } from '../actions/ticket.actions';
import { priorityList } from '@/app/utils/ticketUtils';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
const TicketPage = async () => {
  const user = await getCurrentUser();
  if (!user) { 
    redirect('/login');
  }

  const tickets = await getTicket();


  return (
    <div className=' flex flex-col items-center justify-center gap-4  bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold mb-6 text-green-600 flex justify-center mx-auto'>
        Your Tickets
      </h1>
      {tickets.length === 0 ? (
        <p className='text-center text-gray-600'>No Tickets to display</p>
      ) : (
        <div className='space-y-4 max-w-3xl mx-auto'>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className='bg-white spay4 max-w-3xl p-4 rounded-lg shadow-md'
            >
              <div className='space-y-4 flex gap-6 place-items-center p-4 justify-between max-w-3xl mx-auto'>
                <h2 className='text-xl font-semibold text-blue-600'>
                  {ticket.subject}
                </h2>
                <div className='flex flex-col gap-4 max-w-xl'>
                  <p className='text-sm text-gray-500 mt-1'>
                    Priority:<span className={priorityList(ticket.priority)}>{ticket.priority}</span> 
                  </p>
                  <Link
                    href={`/tickets/${ticket.id}`}
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:underline'
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketPage;
