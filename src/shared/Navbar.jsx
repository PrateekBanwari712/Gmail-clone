import React from 'react'
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

import { IoIosSearch } from 'react-icons/io';
import { CiCircleQuestion } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchText } from '../redux/appslice';
import { useState, useEffect } from 'react';
import { animate, AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { setuser } from '../redux/appslice';


const Navbar = () => {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false)
  const {user} = useSelector(store => store.appSlice)
  const dispatch = useDispatch();

  const signoutHandler = ()=>{
    signOut(auth).then(()=>{
      dispatch(setuser(null));
    }).catch((err)=>{
      console.log(err);
      
    }) 
  }

  useEffect(() => {
    dispatch(setsearchText(input))

  }, [input])
  return (
    <>
      <div className='flex items-center justify-between mx-3 h-16  '>
        <div className='flex items-center gap-16'>
          <div className='flex items-center gap-2'>
            <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              <RxHamburgerMenu size={"20px"} />
            </div>
            <img className='w-8' src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="gmail-logo" />
            <h1 className='text-2xl text-gray-500 font-medium '>Gmail</h1>
          </div>
        </div>
        <div className='md:block w-[50%] mr-60'>
          <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
            <IoIosSearch size={"24px"} className='text-gray-700' />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Search Mail'
              className='rounded-full w-full bg-transparent outline-none px-1' />
          </div>
        </div>
        <div className='md:block hidden'>
          <div className='flex items-center gap-2 '>
            <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              <CiCircleQuestion size={"20px"} />
            </div>
            <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              <CiSettings size={"20px"} />
            </div>
            <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              < PiDotsNineBold size={"20px"} />
            </div>
            <div className='relative cursor-pointer'>
              <Avatar onClick={() => setToggle(!toggle)} src={user?.photoURL}className='rounded-full' size={24} />
              <AnimatePresence>
                {
                  toggle && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.1 }}
                      className='absolute right2 z-20 shadow-lg bg-white rounded-md'
                    >
                      <p onClick={signoutHandler} className='p-2 underline '>Logout </p>
                    </motion.div>
                  )
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar