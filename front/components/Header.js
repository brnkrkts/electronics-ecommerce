import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index:10 ;
`;

const Logo = styled(Link)`
   color: #fff;
   text-decoration: none;
   position: relative;
   z-index: 3; 
`;

const Wrapper = styled.div`
 display: flex;
 justify-content: space-between;
 padding: 20px 0;
`;

const StyledNav = styled.nav`
   ${props => props.mobileNavActive ? `
      display: block;
   ` : `
      display: none;
   `}
   gap: 15px;
   position: fixed;
   top: 0;
   bottom: 0px;
   left: 0px;
   right: 0px;
   padding:70px 20px 20px;
   background-color: #222;
   
   @media screen and (min-width:769px){
      display: flex;
      position: static;
      padding: 0;
   }
`;

const NavLink = styled(Link)`
   display: block;
   color:#aaa;
   text-decoration: none;
   min-width: 30px;
   padding: 10px 0;
   svg{
      height: 20px;
   }
   @media screen and (min-width:769px){
      padding: 0;
   }

`;

const NavButton = styled.button`
   background-color: transparent;
   min-height: 100%;
   width: 40px;
   height:  40px;
   border: 0;
   color: white;
   cursor: pointer;
   position: relative;
   z-index: 3; 
   @media screen and (min-width:769px){
      display: none;
   }
`;

const SideIcon = styled.div`
   display: flex;
   align-items: center;
   a{
      display: inline-block;
      min-width: 20px;
      color: inherit;
      color: white;
      svg{
         width: 16px;
         height: 16px;
      }
   }
`;

export default function Header() {
   const { cartProducts } = useContext(CartContext);
   const [mobileNavActive, setMobileNavActive] = useState(false);
   return (
      <StyledHeader>
         <Center>
            <Wrapper>
               <Logo href={'/'}>Ecommerce</Logo>
               <StyledNav mobileNavActive={mobileNavActive}>
                  <NavLink href={'/'}>Home</NavLink>
                  <NavLink href={'/products'}>All products</NavLink>
                  <NavLink href={'/categories'}>Categories</NavLink>
                  <NavLink href={'/account'}>Account</NavLink>
                  <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
               </StyledNav>
               <SideIcon>
                  <Link href={'/search'}><SearchIcon /></Link>
                  <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                     <BarsIcon />
                  </NavButton>
               </SideIcon>
            </Wrapper>
         </Center>
      </StyledHeader>
   );
}