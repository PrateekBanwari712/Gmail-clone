import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import { setopen } from '../redux/appslice'
import { db } from '../firebase';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

const SendMail = () => {
    const [formdata, setFromdata] = useState({
        to:"",
        subject:"",
        message:""
    })
    const open = useSelector(store=>store.appSlice.open);
    const dispatch = useDispatch()
    const changeHandler = (e)=>{
        setFromdata({...formdata, [e.target.name]: e.target.value})
    }
    const submitHandler = async(e) =>{
        e.preventDefault();
        await addDoc(collection(db, "emails"),
        {
         to:formdata.to,
         subject:formdata.subject,
         message:formdata.message,
        createdAt:serverTimestamp(),
        })
        dispatch(setopen(false));
        setFromdata({
            to:"",
            subject:"",
            message:""
        })
    }

    return (
        <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex px-3 py-2 bg-[#f2f6fc] justify-between rounded-t-md'>
                <h1>New Message</h1>
                <div onClick={()=>dispatch(setopen(false))} className='p-2 rounded-full hover:bg-gray-200, cursor-pointer'>
                    <RxCross2 size={"20px"} />
                </div>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'>
                <input onChange={changeHandler} value={formdata.to} name='to' type="text" placeholder='To' className='outline-none py-1 ' />
                <input onChange={changeHandler} value={formdata.subject} name='subject' type="text" placeholder='subject' className='outline-none py-1 ' />
                <textarea onChange={changeHandler} value={formdata.message} name="message" cols={'30'} rows={'10'} className='outline-none py-1'  ></textarea>
                <button type='submit' className='bg-[#0b57d0] rounded-full w-fit px-4 text-white font-medium cursor-pointer'>Send</button>
            </form>
        </div>
    )
}

export default SendMail;

