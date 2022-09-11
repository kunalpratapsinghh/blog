import { Box, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar'

const Home = () => {
  const token=JSON.parse(localStorage.getItem("token"))||"";
  console.log(token,"1")

  const [data,setData]=useState("")
  const homepage=()=>{
    try {
      axios.post("http://localhost:8080",{},{"headers": {
        'Authorization': token 
      }})
      .then((res) => {
        console.log(res.data)
      })
      console.log(token,"2")
    } catch (error) {
      console.log(token,"3")
    }
  }
  setTimeout(()=>{
    homepage()
  },1000)
  homepage()
  return (
    <Box>
      <Navbar/>
      <Box>Home</Box>
      <Text>{data}ggg</Text>
    </Box>
  )
}

export default Home