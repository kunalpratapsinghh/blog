import {
  Box,
  Link,
  Spacer,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
const Navbar = () => {
  const navigate = useNavigate();
  let x = JSON.parse(localStorage.getItem("token")) || null;
  const [token, setToken] = useState(x);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  useEffect(() => {}, [token]);

  return (
    <Box p={["10px", "20px"]}>
      <HStack>
        <Link href="/">
          {" "}
          <Box>Home</Box>
        </Link>
        <Spacer />

        {token ? (
          <>
            <Menu>
              <MenuButton
                 w={"150px"}
                 as={IconButton}
                 icon={<HamburgerIcon />}
                 aria-label="Options"
                 variant="outline"
              />
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Menu>
              <MenuButton
                w={"150px"}
                as={IconButton}
                icon={<HamburgerIcon />}
                aria-label="Options"
                variant="outline"
              />
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  SignUp
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
