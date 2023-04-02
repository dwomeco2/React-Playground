import { useState, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin, faFacebook, faInstagram, faPinterest, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface SocialIconProps {
  icon: IconDefinition
  link: string
}

function SocialIconsList(): JSX.Element {
  const [socialIcons, _setSocialIcons] = useState<SocialIconProps[]>([
    {
      icon: faTwitter,
      link: 'https://twitter.com/'
    },
    {
      icon: faLinkedin,
      link: 'https://twitter.com/'
    },
    {
      icon: faFacebook,
      link: 'https://www.instagram.com/'
    },
    {
      icon: faInstagram,
      link: 'https://www.youtube.com/'
    },
    {
      icon: faPinterest,
      link: 'https://www.linkedin.com/'
    },
    {
      icon: faFacebookMessenger,
      link: 'https://github.com/'
    }
  ])
  return (
    <div className="flex justify-between my-4 gap-4">
      {socialIcons.map(({ icon }, index) => (
        <button key={index} className="w-8 h-8 text-white bg-gray-300 rounded-full hover:ring-1 ring-black">
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  )
}

function CopyInput({ link, inputRef }: { link: string; inputRef: React.RefObject<HTMLInputElement> }): JSX.Element {
  return (
    <div className="flex bg-gray-300 px-2 py-1 rounded-md text-xs">
      <input ref={inputRef} type="text" value={link} className="grow bg-transparent outline-none" readOnly />
      <button className="font-medium pl-2" onClick={() => navigator.clipboard.writeText(inputRef.current?.value ?? '')}>
        Copy
      </button>
    </div>
  )
}

export default function ShareCard() {
  const [copyLink, _setCopyLink] = useState('https://www.copymehaha.com/aslkdowce')
  const inputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>

  return (
    <div className="flex items-center">
      <div className="mx-auto">
        <div className="h-full px-10 py-6 bg-gray-100 rounded-xl shadow-md shadow-gray-400">
          <div className="font-bold text-sm">Share this challenge</div>
          <SocialIconsList />
          <div className="text-xs mb-2">or copy link</div>
          <CopyInput link={copyLink} inputRef={inputRef} />
        </div>
      </div>
    </div>
  )
}
