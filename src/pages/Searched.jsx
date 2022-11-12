import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import styled from 'styled-components';
function Searched() {
    const params = useParams();
    const [searched, setSearched] = useState([]);
    const getSearchedData =async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=15`)
            .then(res => res.json()).then(res=>res.results)
           
        setSearched(data);
    }
    useEffect(() => {
        getSearchedData(params.name);
    },[params.name])
  return (
      <div>
          <Grid>
              {searched.map(s => {
                  return <Link to={'/recipe/'+s.id}>
                  <Card>
                      <h4>{s.title}</h4>
                      <img src={ s.image} />
                  </Card>
                  </Link>
              })}
          </Grid>
    </div>
  )
}
const Grid = styled.div`
margin:0 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  @media (max-width: 865px) {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    margin:0 2rem;
  }
`;

const Card = styled.div`
position:relative;
  img {
    
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
   
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
    height:auto;
    padding:10px 0;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#393939;
    margin:0;
    border-bottom-right-radius:2rem;
     border-bottom-left-radius:2rem;

  
  }
`;
export default Searched