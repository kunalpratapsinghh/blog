import { Box } from '@chakra-ui/react'
import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
const Admin = () => {
  const [searchParams] = useSearchParams();
  const [code,setCode]=useState(searchParams.get('code'))
  console.log(code)
  const call=()=>{
    axios.get(`http://localhost:8080/callback/${code}`)
    .then((res)=>console.log(res.data))
  }

  useEffect(()=>{
    call()
  },[])
  return (
   <Box>Admin</Box>
  )
}

export default Admin