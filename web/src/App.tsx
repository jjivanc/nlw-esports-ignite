import { useEffect, useState } from 'react';
import axios from 'axios'
import { GamerBanner } from './components/GamerBanner';
import { CreatAdsBanner } from './components/CreatAdsBanner';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreatAdsModal } from './components/CreatAdsModal';

interface Game{
  id: string,
  title: string,
  bannerURL: string,
  _count: {
    ads: number
  }
}

function App() {

  const [gameList,setGameList] = useState<Game[]>([]);
  useEffect( () => {
    axios('http://localhost:3333/games')
    .then( response => {setGameList(response.data)})
  },[])


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg}/>

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text '>duo</span> está aqui</h1>

      <div className="grid grid-cols-6 gap-6 mt-16 mb-4">
        {gameList.map( item => {
          return (
            <GamerBanner 
              title={item.title}
              bannerURL={item.bannerURL}
              adsCount={item._count.ads}
              key={item.id}
            />
          )
        })}

      </div>

      <Dialog.Root>
        <CreatAdsBanner />
        
        <CreatAdsModal/>
      </Dialog.Root>

    </div>
  )
}

export default App
