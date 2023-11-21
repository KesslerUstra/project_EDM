'use client'

import { useEffect } from 'react';

export default function RedirectPage(){
  useEffect(() => {
    window.location.href = 'https://youtu.be/Eas2xc5dAn8';
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '26px', fontWeight: 'bold'}}>Aguarde o Redirecionamento</div>
  );
};