"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import DiscordIcon from '@mui/icons-material/SportsEsports';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/poop.png'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>PoseriSe</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
 {session?.user ? (
 <div className='flex gap-3 md:gap-5'>
 <Link href='/create-prompt' className='black_btn'>
 Objavi
 </Link>

 <button type='button' onClick={signOut} className='outline_btn'>
 Odjava
 </button>

 <Link href='/profile'>
 <Image
 src={session?.user.image}
 width={37}
 height={37}
 className='rounded-full'
 alt='profile'
 />
 </Link>
 </div>
 ) : (
 <>
 <button
 type='button'
 onClick={() => setShowModal(true)}
 className='black_btn'
 >
 Prijava
 </button>

 {showModal && (
 <>
 <div
 className='fixed inset-0 z-50 bg-black bg-opacity-50'
 style={{ backdropFilter: 'blur(5px)' }}
 onClick={() => setShowModal(false)}
 ></div>
 <div className='fixed inset-0 z-50 flex items-center justify-center'>
 <div
 className='bg-white p-8 rounded-lg shadow-lg'
 onClick={(e) => e.stopPropagation()}
 >
 {/* Modal content */}
 <div className='flex flex-col gap-4'>
 {providers &&
 Object.values(providers).map((provider) => (
 <button
 key={provider.name}
 onClick={() => {
 signIn(provider.id);
 }}
 style={{
 backgroundColor:
 provider.name === 'Google' ? '#4285F4' : '#7289DA',
 color: 'white',
 }}
 className='flex items-center gap-2 p-2 rounded-md border border-gray-300 hover:bg-opacity-90'
 >
 {provider.name === 'Google' && <GoogleIcon />}
 {provider.name === 'Discord' && <DiscordIcon />}
 Prijava sa {provider.name}
 </button>
 ))}
 <button
 onClick={() => setShowModal(false)}
 className='p-2 rounded-md border border-gray-300 hover:bg-gray-100'
 >
 Close
 </button>
 </div>
 </div>
 </div>
 </>
 )}
 </>
 )}
 </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
 {session?.user ? (
 <div className='flex'>
 <Image
 src={session?.user.image}
 width={37}
 height={37}
 className='rounded-full'
 alt='profile'
 onClick={() => setToggleDropdown(!toggleDropdown)}
 />

 {toggleDropdown && (
 <div className='dropdown'>
 <Link
 href='/profile'
 className='dropdown_link'
 onClick={() => setToggleDropdown(false)}
 >
 Moj profil
 </Link>
 <Link
 href='/create-prompt'
 className='dropdown_link'
 onClick={() => setToggleDropdown(false)}
 >
 Objavi
 </Link>
 <button
 type='button'
 onClick={() => {
 setToggleDropdown(false);
 signOut();
 }}
 className='mt-5 w-full black_btn'
 >
 Odjava
 </button>
 </div>
 )}
 </div>
 ) : (
 <>
 <button
 type='button'
 onClick={() => setShowModal(true)}
 className='black_btn'
 >
 Prijava
 </button>

 {showModal && (
 <>
 <div
 className='fixed inset-0 z-50 bg-black bg-opacity-50'
 style={{ backdropFilter: 'blur(5px)' }}
 onClick={() => setShowModal(false)}
 ></div>
 <div className='fixed inset-0 z-50 flex items-center justify-center'>
 <div
 className='bg-white p-8 rounded-lg shadow-lg'
 onClick={(e) => e.stopPropagation()}
 >
 {/* Modal content */}
 <div className='flex flex-col gap-4'>
 {providers &&
 Object.values(providers).map((provider) => (
 <button
 key={provider.name}
 onClick={() => {
 signIn(provider.id);
 }}
 style={{
 backgroundColor:
 provider.name === 'Google' ? '#4285F4' : '#7289DA',
 color: 'white',
 }}
 className='flex items-center gap-2 p-2 rounded-md border border-gray-300 hover:bg-opacity-90'
 >
 {provider.name === 'Google' && <GoogleIcon />}
 {provider.name === 'Discord' && <DiscordIcon />}
 Prijava sa {provider.name}
 </button>
 ))}
 <button
 onClick={() => setShowModal(false)}
 className='p-2 rounded-md border border-gray-300 hover:bg-gray-100'
 >
 Close
 </button>
 </div>
 </div>
 </div>
 </>
 )}
 </>
 )}
 </div>
    </nav>
  );
};


export default Nav;