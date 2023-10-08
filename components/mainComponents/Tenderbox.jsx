import React from 'react'
import Link from 'next/link'


const Tenderbox = (props) => {

  return (
    <div className="flex border-2 white-box rounded mt-2 w-full">
    <div className="p-2 w-1/6">
      <p>Category</p>
      <p className="font-bold text-sm text-orange-500">{props.category}</p>
      <p>Closing Date</p>
      <p className="font-bold text-sm text-orange-500">{props.closeDate}</p>
    </div>
    <div className="p-2 w-3/6">
      <p>State: <span className="font-bold text-orange-500">{props.state}</span></p>
      <p>
        Tender Title: <Link className="underline underline-offset-2 hover:text-gray-800 cursor-pointer" href={props.tID.toString()}>{props.title}</Link>
      </p>
    </div>
    <div className="p-2 w-1/6">
    <p>Value: <span className="font-bold text-orange-500">{props.value}</span></p>
<button className="orange-box w-16 px-2 py-1 text-white mt-4 rounded hover:bg-orange-600">Notice</button>
    </div>
    <div className="p-2 w-1/6">
    <p>TID : {props.tID}</p>
<button className="orange-box px-2 mt-4 py-1 text-white rounded hover:bg-orange-600">	 Documents</button>
    </div>
  </div>
  )
}

export default Tenderbox