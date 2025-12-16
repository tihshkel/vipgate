import React from 'react'
import FastTrackIconSvg from '../../assets/icons/fasttrack-icon.svg'
import LoungeIconSvg from '../../assets/icons/lounge-icon.svg'
import TransferIconSvg from '../../assets/icons/transfer-icon.svg'
import MeetAsistentIconSvg from '../../assets/icons/meetasistent-icon.svg'
import BlueSearchIconSvg from '../../assets/icons/bluesearch-icon.svg'
import DownloadAppIconSvg from '../../assets/icons/dowanloadapp-icon.svg'
import ChatIconSvg from '../../assets/icons/chat-icon.svg'
import InfoIconSvg from '../../assets/icons/info-icon.svg'

export const FastTrackIcon = ({ className = "w-5 h-5" }) => (
  <img src={FastTrackIconSvg} alt="Fast Track" className={className} />
)

export const ChairIcon = ({ className = "w-5 h-5" }) => (
  <img src={LoungeIconSvg} alt="VIP Lounge" className={className} />
)

export const CarIcon = ({ className = "w-5 h-5" }) => (
  <img src={TransferIconSvg} alt="Transfer" className={className} />
)

export const PeopleIcon = ({ className = "w-5 h-5" }) => (
  <img src={MeetAsistentIconSvg} alt="Meet & Assist" className={className} />
)

export const RussianFlagIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 640 480" fill="none">
    <rect width="640" height="160" fill="#fff"/>
    <rect y="160" width="640" height="160" fill="#0039a6"/>
    <rect y="320" width="640" height="160" fill="#d52b1e"/>
  </svg>
)

export const QuestionIcon = ({ className = "w-5 h-5" }) => (
  <img src={InfoIconSvg} alt="Info" className={className} />
)

export const ChatIcon = ({ className = "w-5 h-5" }) => (
  <img src={ChatIconSvg} alt="Chat" className={className} />
)

export const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <img src={DownloadAppIconSvg} alt="Download" className={className} />
)

export const SearchIcon = ({ className = "w-5 h-5" }) => (
  <img src={BlueSearchIconSvg} alt="Search" className={className} />
)
