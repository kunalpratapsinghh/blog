import React, {useEffect, useState } from "react";
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
import axios from "axios";
import {useNavigate} from "react-router-dom"
const Login = () => {
  const navigate=useNavigate()
  const [logindata, setLogindata] = useState({});
  const [show,setShow]=useState(JSON.parse(localStorage.getItem("token"))  || "")
  
  const handlechange = (e) => {
    const { name, value } = e.target;
    setLogindata({ ...logindata, [name]: value });
  };
  const handlesignin = () => {
    try {
      axios
        .post("http://localhost:8080/login", logindata)
        .then((res) => {
          console.log(res.data)
          if(res.data.token){
            localStorage.setItem("token",JSON.stringify(res.data.token))
            setShow(!show)
            alert(`${res.data.name} Login Succesfully`)
          }
          else{
            alert(res.data)
          }
        })
        .then(()=>{
          navigate("/")
        })
    } catch (error) {
      console.log(error);
    }
    onClose();
  };
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  useEffect(() => {
    
  }, [show])
  
  return (
    <>
       <Navbar/>
      <Box> 
        <Box>
          <Button
          variant={"ghost"}
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
            isDisabled={show?true:false}
          >
            {!!show?"Already Logged in":"Click here to Login"}
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={handlechange}
                ></Input>
                <Input
                  name="password"
                  placeholder="Enter Password"
                  onChange={handlechange}
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button variant={"ghost"} onClick={handlesignin}>Login</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      </>
  );
};
export default Login;
