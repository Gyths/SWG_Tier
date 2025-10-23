// app/_components/ConditionalNavBar.tsx
'use client';
import { usePathname } from 'next/navigation';
import NavBar from './navBar';

export default function ConditionalNavBar() {
  const pathname = usePathname();
  
  // Ocultar NavBar en la página de login
  if (pathname === '/login') {
    return null;
  }
  
  return <NavBar />;
}