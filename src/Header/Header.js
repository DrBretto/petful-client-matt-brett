import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
return (
      <header className="light">
        <Link to="/"><h1>FIFO Adoption Agency</h1></Link>
      </header>
  );
}