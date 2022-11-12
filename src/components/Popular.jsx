import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate, Link } from 'react-router-dom';
function Popular() {
  const [popular, setPopular] = useState([]);
  const getPopularData = async () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
        .then(res => res.json()).then(res => res.recipes);
      localStorage.setItem('popular', JSON.stringify(data));
      setPopular(data);
    }
    
  }
  useEffect(() => {
    getPopularData();
  },[])
  return (
    <div>
      <Wrapper>
        <h3>Our Popular Picks</h3>
        <Splide options={{
          perPage: 4, pagination: false, arrows: false, drag: 'free', gap: '3rem', breakpoints: {
          1100: {
			perPage: 3,
		},900: {
			perPage: 2,
		},560: {
			perPage: 1,
		},
        }}}>
          {popular.map(p => {
            return <SplideSlide key={p.id}>
              <Link to={'/recipe/'+p.id}>
                 <Card>
                <p>{p.title}</p>
                <img src={p.image} />
                <Gradient/>
              </Card>
              </Link>
            </SplideSlide>
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}
const Wrapper = styled.div `
  margin: 4rem ;
  border-radius:2rem;
  h3{
     font-weight:500;
  }
    @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }
    margin:4rem 2rem ;
  }
  }
`;
const Card = styled.div `

  min-height: 18rem;
  border-radius:2rem;
  overflow: hidden;
  position:relative;
  width:100%;
  

  img {
   border-radius:2rem;
   position:absolute;
   left:0;
   width:100%;
   height:100%;
   
  
   object-fit:cover;
  }
  p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0;
    transform:translate(-50%,0%);
    color:white;
    width:100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;

  }
  
`;
const Gradient = styled.div `
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
`;

export default Popular