import './header.css'

import React from 'react'

export const Header = () => {
  return (
    <>
     <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
        alt=""
      />
    </div>
    </>
  )
}
