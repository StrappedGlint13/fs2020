import React from 'react'
import { Footer, Container } from 'react-bulma-components'

const AppFooter = () => {
  return (
    <Footer backgroundColor="black">
      <Container>
        <div className="content has-text-centered" style={{ paddingTop: '5em' }}>
          <p style={{ marginTop: '8em' }}> Fullstack 2020 <a href="https://fullstackopen.com/osa7">Part 7</a>.</p>
        </div>
      </Container>
    </Footer >
  )
}

export default AppFooter