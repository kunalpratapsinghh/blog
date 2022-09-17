import { Box, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import Navbar from './Navbar'

const Home = () => {
  const token=JSON.parse(localStorage.getItem("token"))||"";
  const [authorize,setAutorize] =useState("")
  const homepage=()=>{
    try {
      axios.get("http://localhost:8080/",{headers: {
        "Content-Type": "application/json",
        "Authorization": token 
      }})
      .then((res) => {
        setAutorize(res.data)
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
      <Heading>{authorize}</Heading>
    </Box>
  )
}

export default Home