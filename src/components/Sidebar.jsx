import React, { useState } from 'react'
import { IoMdStar } from 'react-icons/io'
import { LuPencil } from 'react-icons/lu'
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from 'react-icons/md'
import { TbSend2 } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { setopen } from '../redux/appslice'

const sidebarItems = [
    {
        icon: <LuPencil size={"24px"} />,
        text: "Inbox"
    },
    {
        icon: <IoMdStar size={"24px"} />,
        text: "Starred"
    },
    {
        icon: <MdOutlineWatchLater size={"24px"} />,
        text: "Snooze"
    },
    {
        icon: <TbSend2 size={"24px"} />,
        text: "Sent"
    },
    {
        icon: <MdOutlineDrafts size={"24px"} />,
        text: "Draft"
    },
    {
        icon: <MdOutlineKeyboardArrowDown size={"24px"} />,
        text: "more"
    },
]

const Sidebar = () => {
    // const [open, setopen] = useState(false)
    const dispatch = useDispatch();
    return (
        <div className='w-[15%]'>
            <div className='p-3'>
                <button onClick={()=>dispatch(setopen(true)) } className='flex items-center gap-2 p-4 rounded-2xl hover:shadow-xl bg-[#c2e7fa] cursor-pointer'>
                    <LuPencil size={"24px"} /> Compose</button>
            </div>
            <div className='text-gray-500'>
                {sidebarItems.map((Item, index) => {
                    return (
                        <div className='flex items-center gap-4  pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200 my-2'>
                            {Item.icon}
                            <p>{Item.text}</p>
                        </div>
                    )
                })
                }

            </div>
        </div>
    )
}

export default Sidebar