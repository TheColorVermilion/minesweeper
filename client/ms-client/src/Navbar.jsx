import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export const NavBar = () => {
  return (
    <div>
      <Card>
        <h1>MineSweeper</h1>
        <Link to='/'><Button className="p-button-outlined">HOME</Button></Link>
      </Card>
    </div>
  )
}