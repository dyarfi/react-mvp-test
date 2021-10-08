import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('should render Poke List header', () => {
  render(<App />)
  const linkElement = screen.getByText(/Poke List/i)
  expect(linkElement).toBeInTheDocument()
})

test('should render loading.. header', () => {
  render(<App />)
  const loadingElement = screen.getByText(/loading../i)
  console.log(expect(loadingElement).toBeInTheDocument())
})

// TODO: load test
/* 
describe('App', () => {
  it('loads a bunch of pokelist', () => {
    const { container } = render(<App />)
  })
}) */
