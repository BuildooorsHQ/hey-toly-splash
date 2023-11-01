/* Hey Toly website landing page > ./pages/index.tsx */
import { useEffect, useRef, useState } from 'react';
import apple from '../public/app-store.svg'
import android from '../public/google-play-badge.webp'
import Image from 'next/image';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const handleChange = (e:any) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

const handleApple = () => {
window.alert('Coming Soon!')
}

const handleAndroid = () => {
  const link = document.createElement('a');
  link.href = '/android.apk';  // Replace with your APK file URL
  link.download = 'android.apk';  // Optionally name the file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const validateEmail = (email:any) =>{
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const test = re.test(String(email).toLowerCase());
console.log('valid email?', test)
  setValidEmail(test)
}
      const handleClick = async ()=>{

      if (email === '' || email === null || email === undefined) { 
      setError(true)
      }

      setLoading(true)
      try {
      const options = { 
                    method: 'POST', 
                    headers: { 'Content-type': 'application/json'}, 
                    body: JSON.stringify({email: email, waitlist_id: 11587}) 
                    }
      const response = await fetch('https://api.getwaitlist.com/api/v1/waiter', options)
      const reply = await response.json()
      console.log(reply)
      setSuccess(true)
      setError(false)
      } catch (error) {

      console.log('error', error)
      setError(true)
      setSuccess(false)
      }
      setLoading(false)
      }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleVideoEnd = () => setIsPlaying(false);

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  return (
    <main className="flex flex-col md:flex-row items-center justify-between min-h-screen p-4 md:p-8 text-white main-background">

      {/* Left Side - Content */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-4 md:py-8">
        {/* App Name */}
        <div className="mb-4">
          <h1 className="mt-4 font-bold text-mobile-title md:text-9xl gradient-text">Hey Toly</h1>
        </div>

        {/* Tagline */}
        <p className="mb-8 text-center text-xl">Discover Solana with your very own Toly!</p>

        {/* Waitlist Button */}
        <input className='px-8 py-3 bg-white text-green-600 rounded-full m-3' placeholder='toly@solana.com' onChange={handleChange}></input>
      {loading && <div id="loader"></div>}
      {success && <span>Thank you. You have been registered</span>}
      {error && <span>Sorry there was an error. Please try again.</span>}
      {!loading && !success && 
      <input type={'button'} className="cursor-pointer px-8 py-3 bg-white text-green-600 font-semibold rounded-full hover:text-white hover:bg-green-600 m-3" 
      onClick={handleClick} value={'Join Waitlist'} />}
        {/* Download Button
        <a href="#download" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full">Download Now</a> */}

      </div>
    {/* Apple Button */}
    <Image className='cursor-pointer' onClick={handleApple} src={apple} alt={"Download from the Apple Store"} width={'200'} height={'200'}/>
    {/* Android Button */}
    <Image className='cursor-pointer' onClick={handleAndroid} src={android} alt={"Download from the Apple Store"} width={'200'} height={'200'}/>

      {/* Right Side - Video */}
      <div className="video-container w-full md:w-3/5 p-4 md:p-8 relative cursor-pointer" onClick={toggleVideo}>
        <div className="w-full h-full flex items-center justify-center">
          <video ref={videoRef} className="video rounded-lg shadow-lg max-w-full object-cover">
            <source src="/discover-sol.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {!isPlaying && (
          <div className="play-icon-container absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-6xl md:text-9xl">▶️</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-4 md:absolute bottom-0 w-full text-center p-4">
        <p className="text-sm">© 2023 Hey Toly. All Rights Reserved. Built by <a href="https://buildooors.com" target="_blank" rel="noopener noreferrer">Buildooors</a></p>
      </footer>
    </main>
  );
}
