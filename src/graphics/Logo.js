import React from 'react'
import LogoImg from '../assets/logo_black_bg.svg'
import './logo.scss'


function Logo()  {
  return (
    <img className='LogoDieKarte' src={LogoImg} alt="Logo" />
  );
}

export default Logo
