import { useAnimations } from './hooks/useAnimations'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import WhatIDo from './components/WhatIDo'
import Work from './components/Work'
import Experience from './components/Experience'
import AIDev from './components/AIDev'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  useAnimations()
  return (
    <>
      <Intro />
      <div className="dots" />
      <div className="orb a" />
      <div className="orb b" />
      <div className="progress" id="progress" />

      <Nav />

      <main id="top">
        <Hero />
        <Marquee />
        <WhatIDo />
        <Work />
        <Experience />
        <AIDev />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </>
  )
}
