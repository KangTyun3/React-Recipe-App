import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { motion } from 'framer-motion';
function Recipe() {
    const params = useParams();
    const [activeTab,setActiveTab] =useState('Instructions')
    const [recipe, setRecipe] = useState({})
    const getRecipeData =async (id) => {
        const data =await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json());
        setRecipe(data);
       
    }
    useEffect(() => {
        getRecipeData(params.id);
   },[params.id])
  return (
      <motion.div animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}>
          <DetailWrapper>
              <div>
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} />
                  <div className='btnGp'>
                      <Button className={activeTab==='Instructions' ?'active' :''} onClick={()=>setActiveTab('Instructions')}>Instructions</Button>
                  <Button className={activeTab==='Ingredients' ?'active' :''} onClick={()=>setActiveTab('Ingredients')}>Ingredients</Button>
                  </div>
              </div>
              <Info>
                  {activeTab === 'Instructions' ? <div>
                     <br></br> <h4>Summary</h4>
                      <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p><br></br>
                       <h4>Instructions</h4>
                  <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p> <br></br><br></br>
                  </div> : 
                      <ul>
                          <h4>Ingredients</h4>
                      {recipe.extendedIngredients?.map(i => {
                          return <li>{i.original}</li>
                      })}
                                                <br></br><br></br>
                      </ul>

                  }
                  
              </Info>

          </DetailWrapper>
      </motion.div>
  )
}
const DetailWrapper = styled.div `
  margin: 5rem;
  
  display: flex;
  color: var(--gray-800);
  .active {
    background: var(--gray-900);
    color: var(--gray-50);
  }
 
  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
   @media (max-width: 450px) {
    margin:0 2rem;
    h3{
        font-size:1.3rem;
    }
    }
  }
  }
  img {
    border-radius: 1.5rem;
   
  }
  
  @media (max-width: 1400px) {
    img {
      width: 450px;
    }
  }
  @media (max-width: 1120px) {
    img {
      width: 350px;
    }
  }
  @media (max-width: 865px) {
    flex-direction: column;
    img {
      width: 100%;
    }
    .imageWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Button = styled.button `
 

  padding: 1rem 2rem;
  margin-bottom: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
 font-size:0.9rem;
  
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &.active {
    background: black;
    color:white;
  }
 
`;

const Info = styled.div `
 
  display: flex;
  justify-content: center;
  flex-direction: column;
  width:800px;
  margin-left:50px;
  max-width: 100%;
  ul {
    margin-top: 2rem;
    color: var(--gray-800);
  }
  li {
    margin-top: 0.8rem;
    font-size: 1.1rem;
    font-weight:430;
   
  }
  h4{
    font-size:1.4rem;
    font-weight:500;
   
  }
   p {
    font-weight:400;
    font-size:1.1rem;
    line-height:30px;
    
  }
  @media (max-width: 865px) {
    button {
      width: 100%;
    }
   
    margin-left: 10px;
  }
`;


export default Recipe