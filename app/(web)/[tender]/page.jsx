"use client"

import Tender from '@/components/mainComponents/Tender'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TenderOne = ({params}) => {
  const [load,setLoad] = useState(false);
  const [tender,setTender] = useState();

  useEffect(() => {
    const getTender = async() =>{
        const result = await axios.get(`http://localhost:4000/api/${params.tender}`);

        setTender(result.data[0]);
        console.log(result.data[0]);
        setLoad(true);
    }
    getTender();
  }, )

  

  return (
    <>    
    {load? <Tender  key={tender.tID}
              category={tender.category}
              closeDate={tender.closeDate}
              state={tender.state}
              title={tender.title}
              value={tender.value}
              tID={tender.tID}/> : <p>Loading.....</p>}
    </>
  )
}

export default TenderOne