/* Hey Toly website landing page > ./pages/index.tsx */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import code from '@code-wallet/elements';


export default function Home() {
  const [email, setEmail] = useState()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { button } = code.elements.create('button', {
      currency: 'usd',
      destination: '6SSsGj8F15BpNiBftHK8bLgx4NeZ9aymiPyuF69UFyXf',
      amount: 0.05,
      webhook: { url: `https://heytoly.com/thanks?email=${email}` }
    });

    if (button) {
        button.mount(el.current!);
      }
    }, []);

  const handleChange = (e:any) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
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

      </div>
      <div ref={el} >Sign-up with Code </div>

      {/* Footer */}
      <footer className="mt-4 md:absolute bottom-0 w-full text-center p-4">
        <p className="text-sm">© 2023 Hey Toly. All Rights Reserved. Built by <a href="https://buildooors.com" target="_blank" rel="noopener noreferrer">Buildooors</a></p>
      </footer>
    </main>
  );
}
