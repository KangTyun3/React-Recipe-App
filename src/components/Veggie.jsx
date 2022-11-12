import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';
import { useNavigate, Link } from 'react-router-dom';
function Veggie() {
    const [veggie, setVeggie] = useState([]);
  const getVeggieData = async () => {
    const check = localStorage.getItem('veggie');
    if (check) {
            setVeggie(JSON.parse(check));
        } else {
             const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags=vegetarian&number=9`)
            .then(res => res.json()).then(res => res.recipes);
                  localStorage.setItem('veggie', JSON.stringify(data));
            setVeggie(data);
        }
        
    }
    useEffect(() => {
        getVeggieData();
    },[])
  return (
      <div>
          <Wrapper>
              <h3>Our Vegetarian Picks</h3>
              <Splide options={{ perPage: 3, pagination:true, drag: 'free', arrows: false,gap:'3rem',breakpoints: {
		1100: {
			perPage: 3,
		},900: {
			perPage: 2,
		},560: {
			perPage: 1,
		},
  }}}>
          {veggie.map(v => {
              return   <SplideSlide   key={v.id}>
                      <Link to={'/recipe/'+v.id}>
                       <Card >
                              <p >{v.title}</p>
                        <img src={v.image} />
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
    margin: 2rem ;
  }
`;
const Card = styled.div `

  min-height: 15rem;
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

export default Veggie