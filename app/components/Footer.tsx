const Footer = () => {
    return ( 
        <section className="p-8 mx-auto">
            {/* footer */}
            <article className="flex justify-between place-items-center">
                <p className="text-2xl uppercase font-bold text-green-500">Kenki Ticket</p>
                <p className="">Your ticket sorted</p>
            </article>
             <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
        </section>
     );
}
 
export default Footer;