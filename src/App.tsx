import React from 'react';
import { TripProvider } from './context/TripContext';
import Header from './components/Header';
import TripBoard from './components/TripBoard';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <TripProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <TripBoard />
        </main>
        <Toaster />
      </div>
    </TripProvider>
  );
}

export default App;