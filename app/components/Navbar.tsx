import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center'>
      <div>
        <Link href='/' className='text-xl font-bold uppercase font-bold text-green-600'>
          KenkiTicket
        </Link>
      </div>

      <div className='flex items-center space-x-4'>
        <Link
          href='/login'
          className='text-blue-600 hover:underline transition'
        >
          Login
        </Link>
        <Link
          href='/register'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
