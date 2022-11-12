import React,{useState,useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'
import { BiCookie } from 'react-icons/bi'
import {BsGithub} from 'react-icons/bs'
import styled from 'styled-components'
import { Navigate, useNavigate,Link } from 'react-router-dom';
function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const submitFun = (e) => {
        e.preventDefault();
        navigate('/searched/' +input)
    }
    const key = () => {
        console.log('enter')
    }
        
    
  return (
      <div style={{display:'flex' }}>
          <Link to="/" style={{display:'flex' }}>
            <h3 className='name' style={{marginLeft:'60px',marginTop:'30px' }}>Tasty</h3><Logo /></Link>
          <FormStyle onSubmit={submitFun}>
              <FaSearch />
              <input onChange={(event) => setInput(event.target.value)}  /> 
          </FormStyle>
          
    </div>
  )
}

const Logo = styled(BiCookie)`

margin-top:30px;
font-size:1.6rem;
`;
const FormStyle = styled.form`

  position: relative;
  width: 40%;
  margin:20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    position: relative;
    width: 500px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.1rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
  @media (max-width: 768px){
    width:60%;
    input{
        font-size:.9rem;
    }
}
`;


export default Search