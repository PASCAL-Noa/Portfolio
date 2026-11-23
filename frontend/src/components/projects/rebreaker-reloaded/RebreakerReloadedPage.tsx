import React, { useState, useEffect, useCallback, useRef } from 'react';
import './rebreaker-crt.css';
import { ChannelId, TV_CHANNELS } from './data';
import { retroAudio } from './retroAudio';
import { RetroTvChassis } from './RetroTvChassis';
import { CrtScreen } from './CrtScreen';
import { CampaignChannel } from './channels/CampaignChannel';
import { EngineChannel } from './channels/EngineChannel';
import { WorkshopChannel } from './channels/WorkshopChannel';
import { UltimatesChannel } from './channels/UltimatesChannel';

interface RebreakerReloadedPageProps {
  githubUrl?: string;
  onBack: () => void;
}

const DEFAULT_GITHUB_URL = 'https://github.com/PASCAL-Noa/REBREAKER-Reloaded';

export const RebreakerReloadedPage: React.FC<RebreakerReloadedPageProps> = ({
  githubUrl = DEFAULT_GITHUB_URL,
  onBack,
}) => {
  const [activeChannel, setActiveChannel] = useState<ChannelId>(1);
  // Muted by default on page load for web audio etiquette; user can raise Volume knob anytime
  const [volume, setVolume] = useState<number>(0);
  const [crtFxEnabled, setCrtFxEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isBooting, setIsBooting] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isStaticBurst, setIsStaticBurst] = useState<boolean>(false);
  const [showVolumeOsd, setShowVolumeOsd] = useState<boolean>(false);
  const [showPowerPrompt, setShowPowerPrompt] = useState<boolean>(false);
  const [isPoweringOff, setIsPoweringOff] = useState<boolean>(false);

  const bootTimerRef = useRef<number | null>(null);
  const staticTimerRef = useRef<number | null>(null);
  const volumeOsdTimerRef = useRef<number | null>(null);
  const powerOffTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isBooting) return;
    bootTimerRef.current = window.setTimeout(() => {
      setIsBooting(false);
    }, 2150);
    return () => {
      if (bootTimerRef.current) window.clearTimeout(bootTimerRef.current);
    };
  }, [isBooting]);

  useEffect(() => {
    return () => {
      if (bootTimerRef.current) window.clearTimeout(bootTimerRef.current);
      if (staticTimerRef.current) window.clearTimeout(staticTimerRef.current);
      if (volumeOsdTimerRef.current) window.clearTimeout(volumeOsdTimerRef.current);
      if (powerOffTimerRef.current) window.clearTimeout(powerOffTimerRef.current);
    };
  }, []);

  const handleSkipBoot = useCallback(() => {
    if (bootTimerRef.current) window.clearTimeout(bootTimerRef.current);
    setIsBooting(false);
  }, []);

  const triggerChannelSwitch = useCallback(
    (nextId: ChannelId) => {
      if (isPoweringOff) return;
      if (isBooting) handleSkipBoot();
      if (nextId === activeChannel) return;

      setShowPowerPrompt(false);
      setActiveChannel(nextId);
      retroAudio.playChannelClick(volume);
      retroAudio.playTvStatic(volume, 0.22);

      if (crtFxEnabled) {
        setIsStaticBurst(true);
        if (staticTimerRef.current) window.clearTimeout(staticTimerRef.current);
        staticTimerRef.current = window.setTimeout(() => {
          setIsStaticBurst(false);
        }, 320);
      }
    },
    [activeChannel, crtFxEnabled, handleSkipBoot, isBooting, isPoweringOff, volume]
  );

  const handleStepChannel = useCallback(
    (delta: 1 | -1) => {
      const currentIdx = TV_CHANNELS.findIndex((c) => c.id === activeChannel);
      const nextIdx = (currentIdx + delta + TV_CHANNELS.length) % TV_CHANNELS.length;
      triggerChannelSwitch(TV_CHANNELS[nextIdx].id);
    },
    [activeChannel, triggerChannelSwitch]
  );

  const handleChangeVolume = useCallback((nextVol: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(nextVol)));
    setVolume(clamped);
    retroAudio.playUiBlip(clamped, 440 + clamped * 2.5);
    setShowVolumeOsd(true);
    if (volumeOsdTimerRef.current) window.clearTimeout(volumeOsdTimerRef.current);
    volumeOsdTimerRef.current = window.setTimeout(() => {
      setShowVolumeOsd(false);
    }, 1400);
  }, []);

  const handlePressPower = useCallback(() => {
    if (isPoweringOff) return;
    if (isBooting) handleSkipBoot();
    retroAudio.playUiBlip(volume, 380);
    setShowPowerPrompt((prev) => !prev);
  }, [handleSkipBoot, isBooting, isPoweringOff, volume]);

  const handleConfirmPowerOff = useCallback(() => {
    if (isPoweringOff) return;
    setShowPowerPrompt(false);
    setIsPoweringOff(true);
    retroAudio.playPowerOff(volume);

    const delay = crtFxEnabled ? 850 : 180;
    powerOffTimerRef.current = window.setTimeout(() => {
      onBack();
    }, delay);
  }, [crtFxEnabled, isPoweringOff, onBack, volume]);

  // Keyboard shortcuts: Left/Right to zap, 1-4 direct channel, Escape to toggle Power dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPoweringOff) return;
      if (e.key === 'ArrowRight') {
        handleStepChannel(1);
      } else if (e.key === 'ArrowLeft') {
        handleStepChannel(-1);
      } else if (e.key >= '1' && e.key <= '4') {
        triggerChannelSwitch(Number(e.key) as ChannelId);
      } else if (e.key === 'Escape') {
        if (isBooting) {
          handleSkipBoot();
        } else {
          setShowPowerPrompt((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkipBoot, handleStepChannel, isBooting, isPoweringOff, triggerChannelSwitch]);

  const activeMeta = TV_CHANNELS.find((c) => c.id === activeChannel) ?? TV_CHANNELS[0];
  const playBlip = useCallback(() => retroAudio.playUiBlip(volume, 560), [volume]);

  const renderChannelContent = () => {
    switch (activeChannel) {
      case 1:
        return <CampaignChannel githubUrl={githubUrl} />;
      case 2:
        return <EngineChannel />;
      case 3:
        return (
          <WorkshopChannel
            volume={volume}
            onChangeVolume={handleChangeVolume}
            onPlayBlip={playBlip}
          />
        );
      case 4:
        return (
          <UltimatesChannel
            volume={volume}
            onChangeVolume={handleChangeVolume}
            onPlayBlip={playBlip}
          />
        );
      default:
        return <CampaignChannel githubUrl={githubUrl} />;
    }
  };

  return (
    <RetroTvChassis
      activeChannel={activeChannel}
      volume={volume}
      crtFxEnabled={crtFxEnabled}
      isBooting={isBooting}
      showPowerPrompt={showPowerPrompt}
      isPoweringOff={isPoweringOff}
      onSelectChannel={triggerChannelSwitch}
      onStepChannel={handleStepChannel}
      onChangeVolume={handleChangeVolume}
      onToggleCrtFx={() => setCrtFxEnabled((prev) => !prev)}
      onPressPower={handlePressPower}
    >
      <CrtScreen
        channel={activeMeta}
        crtFxEnabled={crtFxEnabled}
        isBooting={isBooting}
        isStaticBurst={isStaticBurst}
        isPoweringOff={isPoweringOff}
        showPowerPrompt={showPowerPrompt}
        volume={volume}
        showVolumeOsd={showVolumeOsd}
        onSkipBoot={handleSkipBoot}
        onConfirmPowerOff={handleConfirmPowerOff}
        onCancelPowerOff={() => setShowPowerPrompt(false)}
      >
        {renderChannelContent()}
      </CrtScreen>
    </RetroTvChassis>
  );
};
