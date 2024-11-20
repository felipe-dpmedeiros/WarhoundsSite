import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

  const handleVideoSrcSet = () => {
    console.log('handleVideoSrcSet called');
    console.log('window.innerWidth:', window.innerWidth);
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
    console.log('videoSrc:', videoSrc);
  };

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  }, [handleVideoSrcSet])

  
  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay:1.25 })
    gsap.to('#cta', { opacity: 0.95, y: -50, delay:3})
  }, [])
  
  return (
    <div className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title" style={{ marginTop: '5vh' }}>Bem vindos</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4"/>
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center justify-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Conheça nossos projetos</a>
        <p className="font-normal text-xl"></p>
      </div>
    </div>
  )
}

export default Hero