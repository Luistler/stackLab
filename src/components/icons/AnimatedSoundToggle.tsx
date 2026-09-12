import React, { useState, useEffect } from 'react';
import { Volume2Icon, VolumeXIcon } from '@animateicons/react/lucide';
import { soundEngine } from '../../scripts/sound-engine';

export const AnimatedSoundToggle: React.FC = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(soundEngine.getMuted());
  }, []);

  const handleToggle = () => {
    const isMuted = soundEngine.toggleMute();
    setMuted(isMuted);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Alternar micro-acústica háptica"
      title={muted ? 'Activar sonido' : 'Silenciar sonido'}
      className="p-1.5 rounded-full border border-[#EBE7DF] hover:border-[#243026] text-[#4A5B48] hover:text-[#243026] transition-all cursor-pointer flex items-center justify-center active:scale-90"
    >
      {muted ? (
        <VolumeXIcon size={14} color="currentColor" />
      ) : (
        <Volume2Icon size={14} color="currentColor" />
      )}
    </button>
  );
};
