import React from 'react'
import Navbar from './Navbar'
import First from './First'
import Second from './Second'
import Third from './Third'

function Homepage() {
  return (
    <div>
        <Navbar />
        <First />
        <Second />
        {/* <Third /> */}
    </div>
  )
}

export default Homepage