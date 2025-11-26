import styled from "styled-components"
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import TextArea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Subtitles = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

const ColsWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-bottom: 40px;
  @media screen and (min-width: 768px)  {
    grid-template-columns: 1fr 1fr;
    gap: 40px; 
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #ccc;
  h3{
    margin: 0;
    font-size: 1rem;
    color: #333;
    padding: 10px 0;
    font-weight: normal;
  }
  p{
    margin: 3px 0;
    font-size: 0.8rem;
    line-height: 1rem;
  }
`;

const RevHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time{
    font-size: 12px;
    color: #aaa;
    font-family: inherit;
  }
`;

export default function ProductRevies({ product }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  function submitReview() {
    const data = { title, description, stars, product: product._id };
    axios.post('/api/reviews', data).then(res => {
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function loadReviews() {
    setReviewsLoading(true)
    axios.get('/api/reviews?product=' + product._id).then(res => {
      setReviews(res.data);
      setReviewsLoading(false)
    });
  }

  return (
    <div>
      <Title>Reviwies</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitles>Add a review</Subtitles>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              placeholder='Title' />
            <TextArea
              placeholder='Was it good? Pros? Cons?'
              value={description}
              onChange={ev => setDescription(ev.target.value)} />
            <div>
              <Button primary
                onClick={submitReview} >
                Submit your review
              </Button>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitles>All reviews</Subtitles>
            {reviewsLoading && (
              <Spinner fullWidth={true} />
            )}
            {reviews.length === 0 && (
              <p>No Reviews :( </p>
            )}
            {reviews.length > 0 && reviews.map(review => (
              <ReviewWrapper key={review} >
                <RevHeader>
                  <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} />
                  <time>
                    {(new Date(review.createdAt)).toLocaleString('en-US')} </time>
                </RevHeader>
                <h3>{review.title}</h3>
                <p>{review.description}</p>
              </ReviewWrapper>
            ))}
          </WhiteBox>
        </div>

      </ColsWrapper>

    </div>
  )
}