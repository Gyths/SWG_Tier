// app/_components/NavBarClient.tsx
'use client';
import NavBar from './navBar';

export default function NavBarClient() {
  // you can define event handlers here
  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  return <NavBar onLoginClick={handleLoginClick} />;
}
