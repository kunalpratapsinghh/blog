import { Box, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar'

const Home = () => {
  const token=JSON.parse(localStorage.getItem("token"))||"";

  const [data,setData]=useState("")
  const homepage=()=>{
    try {
      axios.get("http://localhost:8080/",{headers: {
        "Content-Type": "application/json",
        "Authorization": token 
      }})
      .then((res) => {
        console.log(res)
      })
     
    } catch (error) {
      console.log(token,"3")
    }
  }
  homepage()
  return (
    <Box>
      <Navbar/>
      <Box>Home</Box>
      <Heading>{data}</Heading>
    </Box>
  )
}

export default Home