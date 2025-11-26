/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import { useState } from "react";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";


const ProductWrapper = styled.div`
    position: relative;
    min-height: 100%;
    margin: 20px 0 20px 0 ;

    button{
    width: 100%;
    text-align: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
`;

const WhiteBox = styled(Link)`
   background-color: #fff;
   padding: 50px;
   height: 150px;
   text-align: center;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius:10px;
   position: relative;
   img{
      max-width: 100%;
      max-height: 200px;
   }
`;

const Title = styled(Link)`
   font-weight: normal;
   font-size: 1rem;
   margin:0;
   color: inherit;
   text-decoration: none;
`;

const ProductInfoBox = styled.div`
   margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  @media screen and (min-width: 768px) {
    gap: 5px;
    align-items: center;
    justify-content: center;
  }
  align-items: center;
  justify-content: space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
    font-weight:600;
    }
`;

const WhishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10;
  position: absolute;
  top: 0%;
  right: 0%;
  cursor: pointer;
  background:transparent ;
  ${props => props.wished ? `
  color:red;
  ` : `
  color:black;
  `}
  svg {
    width: 18px;
  }
`;


export default function ProductBox(
  { _id, title, description, price, images, wished = false,
    onRemoveFromWishlist = () => { },
  }) {
  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post('/api/wishlist', {
      product: _id,
    }).then(() => { });
    setIsWished(nextValue);
  }
  function truncateTextByWord(text, maxWords) {
    const words = text.split(' ');
  
    if (words.length <= maxWords) {
      return text;
    } else {
      const truncatedText = words.slice(0, maxWords).join(' ','-');
      return truncatedText;
    }
  }
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WhishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WhishlistButton>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <div>
          <Title href={url}>{truncateTextByWord(title,5)}</Title>
        </div>
        <div>
          <PriceRow>
            <Price>
              ${price}
            </Price>
          </PriceRow>
          <FlyingButton _id={_id} src={images?.[0]}>
            Add to cart

          </FlyingButton>
        </div>

      </ProductInfoBox>

    </ProductWrapper>
  );
}