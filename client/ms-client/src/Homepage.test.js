import { render, screen } from '@testing-library/react';
const Homepage = require('../Homepage')

describe('Homepage', () =>{
  it('loads a homepage', () =>{
    let homepage = new Homepage();
    expect(homepage()).toExist()
  })
})