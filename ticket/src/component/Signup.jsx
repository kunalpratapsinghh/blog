import React from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  const [signupdata,setSignupdata]=useState({})
  const handlechange=(e)=>{
    const {name,value}=e.target
    setSignupdata({...signupdata,[name]:value})
  }
  const handlesignup=()=>{
    axios.post("http://localhost:8080/signup",signupdata)
    .then(res=>alert(`Name: ${res.data.name} Email: ${res.data.email} added Successfully`))
    onClose()
  }
  return (
    <Box>
         <Box>
      <Navbar />
      <Box>
        <Button
        variant={"ghost"}
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen();
          }}
        >
          Click here to SignUp
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
          <ModalContent>
            <ModalHeader>Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <Input name="name" placeholder="Enter Full Name" onChange={handlechange}></Input>
             <Input name="email" placeholder="Enter Email Address" onChange={handlechange}></Input>
             <Input name="password" placeholder="Enter Password" onChange={handlechange}></Input>
             <Input name="mobile" placeholder="Enter Mobile" onChange={handlechange}></Input>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handlesignup} >Sign Up</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
    </Box>
  )
}

export default Signup