import icons from './icons';

import newYorkImage from '../assets/images/new-york.png';
import japanImage from '../assets/images/japan.png';

export const cards = [
  {
    title: 'Card 1',
    location: 'Location 1',
    price: '$100',
    rating: 4.8,
    category: 'house',
    image: newYorkImage,
  },
  {
    title: 'Card 2',
    location: 'Location 2',
    price: '$200',
    rating: 3,
    category: 'house',
    image: japanImage,
  },
  {
    title: 'Card 3',
    location: 'Location 3',
    price: '$300',
    rating: 2,
    category: 'flat',
    image: newYorkImage,
  },
  {
    title: 'Card 4',
    location: 'Location 4',
    price: '$400',
    rating: 5,
    category: 'villa',
    image: japanImage,
  },
];

export const featuredCards = [
  {
    title: 'Featured 1',
    location: 'Location 1',
    price: '$100',
    rating: 4.8,
    image: newYorkImage,
    category: 'house',
  },
  {
    title: 'Featured 2',
    location: 'Location 2',
    price: '$200',
    rating: 3,
    image: japanImage,
    category: 'flat',
  },
];

export const categories = [
  { title: 'All', category: 'All' },
  { title: 'Houses', category: 'House' },
  { title: 'Condos', category: 'Condo' },
  { title: 'Duplexes', category: 'Duplex' },
  { title: 'Studios', category: 'Studio' },
  { title: 'Villas', category: 'Villa' },
  { title: 'Apartments', category: 'Apartment' },
  { title: 'Townhouses', category: 'Townhouse' },
  { title: 'Others', category: 'Other' },
];

export const settings = [
  {
    title: 'My Bookings',
    icon: icons.calendar,
  },
  {
    title: 'Payments',
    icon: icons.wallet,
  },
  {
    title: 'Profile',
    icon: icons.person,
  },
  {
    title: 'Notifications',
    icon: icons.bell,
  },
  {
    title: 'Security',
    icon: icons.shield,
  },
  {
    title: 'Language',
    icon: icons.language,
  },
  {
    title: 'Help Center',
    icon: icons.info,
  },
  {
    title: 'Invite Friends',
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: 'Laundry',
    icon: icons.laundry,
  },
  {
    title: 'Parking',
    icon: icons.carPark,
  },
  
  {
    title: 'Gym',
    icon: icons.dumbell,
  },
 
  {
    title: 'Wifi',
    icon: icons.wifi,
  },
  {
    title: 'Pet-friendly',
    icon: icons.dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: newYorkImage,
  },
  {
    id: 2,
    image: japanImage,
  },
  {
    id: 3,
    image: newYorkImage,
  },
  {
    id: 4,
    image: japanImage,
  },
  {
    id: 5,
    image: newYorkImage,
  },
  {
    id: 6,
    image: japanImage,
  },
];
