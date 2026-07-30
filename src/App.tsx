import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioProvider } from './context/AudioContext';
import { Header } from './components/Header';
import { BackgroundGingham } from './components/BackgroundGingham';
import { PageId } from './types';

// Pages
import { OpeningPage } from './pages/OpeningPage';
import { NoRedirectPage } from './pages/NoRedirectPage';
import { PasswordLockPage } from './pages/PasswordLockPage';
import { HeroWishPage } from './pages/HeroWishPage';
import { MessageHubPage } from './pages/MessageHubPage';
import { MomentsGalleryPage } from './pages/MomentsGalleryPage';
import { MusicPlaylistPage } from './pages/MusicPlaylistPage';
import { LetterToHerPage } from './pages/LetterToHerPage';
import { CakeSurprisePage } from './pages/CakeSurprisePage';
import { FinalPage } from './pages/FinalPage';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('opening');

  const handleSelectYes = () => {
    setCurrentPage('password');
  };

  const handleSelectNo = () => {
    setCurrentPage('no_redirect');
  };

  const handleRedirectBackToOpening = () => {
    setCurrentPage('opening');
  };

  const handleUnlockPasswordSuccess = () => {
    setCurrentPage('hero');
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.96, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: -10 },
  };

  return (
    <div className="min-h-screen flex flex-col font-serif-cottage text-[#3d2b1f] selection:bg-[#788b68] selection:text-white">
      
      {/* Header bar */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Conditional Background rendering */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex-1 flex flex-col min-h-screen"
        >
          {currentPage === 'opening' && (
            <BackgroundGingham variant="sage">
              <OpeningPage
                onSelectYes={handleSelectYes}
                onSelectNo={handleSelectNo}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'no_redirect' && (
            <BackgroundGingham variant="dark">
              <NoRedirectPage
                onRedirectBack={handleRedirectBackToOpening}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'password' && (
            <BackgroundGingham variant="sage">
              <PasswordLockPage
                onUnlockSuccess={handleUnlockPasswordSuccess}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'hero' && (
            <BackgroundGingham variant="sage">
              <HeroWishPage
                onContinue={() => setCurrentPage('hub')}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'hub' && (
            <BackgroundGingham variant="sage">
              <MessageHubPage
                onNavigate={setCurrentPage}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'moments' && (
            <MomentsGalleryPage
              onBackToHub={() => setCurrentPage('hub')}
            />
          )}

          {currentPage === 'music' && (
            <BackgroundGingham variant="sage">
              <MusicPlaylistPage
                onBackToHub={() => setCurrentPage('hub')}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'letter' && (
            <BackgroundGingham variant="brown">
              <LetterToHerPage
                onBackToHub={() => setCurrentPage('hub')}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'cake' && (
            <BackgroundGingham variant="sage">
              <CakeSurprisePage
                onProceedToFinal={() => setCurrentPage('final')}
              />
            </BackgroundGingham>
          )}

          {currentPage === 'final' && (
            <FinalPage
              onNavigate={setCurrentPage}
            />
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;
