import React from 'react';
import { AvatarConfig } from '../types';

interface StudentAvatarSvgProps {
  avatar: AvatarConfig;
  size?: number;
  showBackground?: boolean;
  className?: string;
}

export const StudentAvatarSvg: React.FC<StudentAvatarSvgProps> = ({
  avatar,
  size = 140,
  showBackground = true,
  className = '',
}) => {
  const { skinTone, hairStyle, hairColor, outfit, accessory, background } = avatar;

  // Background styling
  const renderBackground = () => {
    switch (background) {
      case 'cosmos':
        return (
          <g>
            <radialGradient id="cosmosGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="60%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
            <circle cx="100" cy="100" r="95" fill="url(#cosmosGrad)" />
            {/* Stars */}
            <circle cx="45" cy="40" r="1.5" fill="#f8fafc" opacity="0.8" />
            <circle cx="150" cy="35" r="2" fill="#38bdf8" opacity="0.9" />
            <circle cx="160" cy="90" r="1" fill="#fbcfe8" opacity="0.7" />
            <circle cx="35" cy="130" r="1.5" fill="#a7f3d0" opacity="0.8" />
            <circle cx="130" cy="155" r="1.5" fill="#fde047" opacity="0.7" />
            {/* Nebula ring */}
            <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="6,4" opacity="0.3" transform="rotate(-25 100 100)" />
          </g>
        );
      case 'observatory':
        return (
          <g>
            <linearGradient id="obsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <circle cx="100" cy="100" r="95" fill="url(#obsGrad)" />
            <polygon points="120,40 180,20 185,25 125,45" fill="#64748b" opacity="0.5" />
            <circle cx="80" cy="30" r="1.5" fill="#fbbf24" />
            <circle cx="120" cy="25" r="2" fill="#ffffff" />
          </g>
        );
      case 'bio-dome':
        return (
          <g>
            <radialGradient id="bioGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="70%" stopColor="#022c22" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <circle cx="100" cy="100" r="95" fill="url(#bioGrad)" />
            {/* Hexagonal dome grid */}
            <path d="M 60,30 L 100,15 L 140,30 L 140,70 L 100,85 L 60,70 Z" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.25" />
          </g>
        );
      case 'cyber-campus':
        return (
          <g>
            <linearGradient id="cyberGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="50%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#831843" />
            </linearGradient>
            <circle cx="100" cy="100" r="95" fill="url(#cyberGrad)" />
            <line x1="20" y1="160" x2="180" y2="160" stroke="#f43f5e" strokeWidth="2" opacity="0.4" />
            <line x1="40" y1="160" x2="70" y2="80" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
            <line x1="160" y1="160" x2="130" y2="80" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
          </g>
        );
      case 'quantum-lab':
      default:
        return (
          <g>
            <radialGradient id="labGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>
            <circle cx="100" cy="100" r="95" fill="url(#labGrad)" />
            {/* Atom orbits */}
            <ellipse cx="100" cy="100" rx="75" ry="30" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4" transform="rotate(30 100 100)" />
            <ellipse cx="100" cy="100" rx="75" ry="30" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4" transform="rotate(-30 100 100)" />
            <circle cx="150" cy="70" r="3" fill="#38bdf8" opacity="0.9" />
            <circle cx="45" cy="80" r="2.5" fill="#a5f3fc" opacity="0.9" />
          </g>
        );
    }
  };

  // Outfit rendering
  const renderOutfit = () => {
    switch (outfit) {
      case 'space-suit':
        return (
          <g>
            {/* White/Silver space suit shoulders */}
            <path d="M 45,160 Q 100,140 155,160 L 165,200 L 35,200 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            {/* Chest telemetry badge */}
            <rect x="85" y="152" width="30" height="18" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="93" cy="161" r="2.5" fill="#22c55e" />
            <circle cx="102" cy="161" r="2.5" fill="#3b82f6" />
            <circle cx="110" cy="161" r="2.5" fill="#f59e0b" />
            {/* Collar seal */}
            <ellipse cx="100" cy="138" rx="36" ry="12" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
          </g>
        );
      case 'cyber-hoodie':
        return (
          <g>
            <path d="M 45,155 Q 100,135 155,155 L 170,200 L 30,200 Z" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
            {/* Neon hoodie trim */}
            <path d="M 70,145 Q 100,180 100,200" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <path d="M 130,145 Q 100,180 100,200" fill="none" stroke="#f43f5e" strokeWidth="2" />
            <ellipse cx="100" cy="138" rx="32" ry="10" fill="#27272a" />
          </g>
        );
      case 'scholar-robe':
        return (
          <g>
            <path d="M 40,155 Q 100,135 160,155 L 170,200 L 30,200 Z" fill="#4338ca" stroke="#fbbf24" strokeWidth="2" />
            {/* Golden sash */}
            <path d="M 75,145 L 90,200 L 110,200 L 125,145" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            <circle cx="100" cy="165" r="5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
          </g>
        );
      case 'varsity':
        return (
          <g>
            <path d="M 45,155 Q 100,135 155,155 L 170,200 L 30,200 Z" fill="#b91c1c" stroke="#f8fafc" strokeWidth="2" />
            <path d="M 40,165 L 75,160 L 65,200 L 30,200 Z" fill="#f8fafc" />
            <path d="M 160,165 L 125,160 L 135,200 L 170,200 Z" fill="#f8fafc" />
            <text x="94" y="175" fill="#ffffff" fontWeight="bold" fontSize="16" fontFamily="sans-serif">Ω</text>
          </g>
        );
      case 'lab-coat':
      default:
        return (
          <g>
            {/* Navy shirt base */}
            <path d="M 45,155 Q 100,135 155,155 L 170,200 L 30,200 Z" fill="#0284c7" />
            {/* White lab coat lapels */}
            <path d="M 35,160 L 70,140 L 80,200 L 30,200 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 165,160 L 130,140 L 120,200 L 170,200 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Pocket with pens */}
            <rect x="52" y="168" width="16" height="18" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <line x1="56" y1="165" x2="56" y2="172" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <line x1="61" y1="163" x2="61" y2="172" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            {/* Tie / ID card */}
            <rect x="94" y="148" width="12" height="16" rx="2" fill="#1e293b" />
            <line x1="100" y1="140" x2="100" y2="148" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
        );
    }
  };

  // Hair rendering
  const renderHair = () => {
    switch (hairStyle) {
      case 'curly':
        return (
          <g fill={hairColor}>
            <circle cx="70" cy="52" r="14" />
            <circle cx="85" cy="45" r="15" />
            <circle cx="102" cy="42" r="16" />
            <circle cx="118" cy="45" r="15" />
            <circle cx="132" cy="54" r="14" />
            <circle cx="62" cy="68" r="12" />
            <circle cx="138" cy="70" r="12" />
          </g>
        );
      case 'long':
        return (
          <g fill={hairColor}>
            <path d="M 62,85 C 60,40 140,40 138,85 C 145,120 148,150 140,155 C 130,158 135,115 132,100 C 132,100 68,100 68,100 C 65,115 70,158 60,155 C 52,150 55,120 62,85 Z" />
            {/* Bangs */}
            <path d="M 65,70 Q 100,55 135,70 Q 100,45 65,70 Z" />
          </g>
        );
      case 'buzz':
        return (
          <g fill={hairColor}>
            <path d="M 66,78 C 66,48 134,48 134,78 C 134,72 130,55 100,55 C 70,55 66,72 66,78 Z" />
          </g>
        );
      case 'short':
        return (
          <g fill={hairColor}>
            <path d="M 64,80 C 60,46 140,46 136,80 C 130,55 70,55 64,80 Z" />
            <path d="M 62,75 L 75,55 L 90,62 L 105,53 L 120,60 L 138,72 Z" />
          </g>
        );
      case 'space-fade':
      default:
        return (
          <g fill={hairColor}>
            {/* Slick modern pompadour fade */}
            <path d="M 64,78 C 62,40 138,36 136,78 C 130,65 125,50 100,48 C 75,48 70,65 64,78 Z" />
            <path d="M 70,58 Q 100,32 130,52 Q 100,44 70,58 Z" opacity="0.8" />
          </g>
        );
    }
  };

  // Accessory rendering
  const renderAccessory = () => {
    switch (accessory) {
      case 'glasses':
        return (
          <g>
            {/* Thin stylish STEM frames */}
            <rect x="73" y="80" width="22" height="15" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#0284c7" strokeWidth="2" />
            <rect x="105" y="80" width="22" height="15" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#0284c7" strokeWidth="2" />
            <line x1="95" y1="87" x2="105" y2="87" stroke="#0284c7" strokeWidth="2" />
            <line x1="65" y1="86" x2="73" y2="86" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="127" y1="86" x2="135" y2="86" stroke="#0284c7" strokeWidth="1.5" />
            {/* Glare */}
            <line x1="76" y1="83" x2="84" y2="91" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <line x1="108" y1="83" x2="116" y2="91" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
          </g>
        );
      case 'vr-headset':
        return (
          <g>
            <rect x="66" y="76" width="68" height="22" rx="6" fill="#09090b" stroke="#38bdf8" strokeWidth="2" />
            {/* Glowing neon visor strip */}
            <rect x="72" y="82" width="56" height="8" rx="3" fill="#06b6d4" opacity="0.85" />
            <line x1="75" y1="86" x2="125" y2="86" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
            {/* Strap */}
            <line x1="66" y1="87" x2="60" y2="87" stroke="#38bdf8" strokeWidth="3" />
            <line x1="134" y1="87" x2="140" y2="87" stroke="#38bdf8" strokeWidth="3" />
          </g>
        );
      case 'space-helmet':
        return (
          <g>
            {/* Bubble visor */}
            <circle cx="100" cy="85" r="48" fill="none" stroke="#e2e8f0" strokeWidth="3" opacity="0.8" />
            <path d="M 68,65 Q 100,50 132,65 Q 140,95 130,115 Q 100,125 70,115 Q 60,95 68,65 Z" fill="rgba(245, 158, 11, 0.25)" stroke="#fbbf24" strokeWidth="2" />
            {/* Gold reflection arc */}
            <path d="M 75,70 A 30 30 0 0 1 120,68" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </g>
        );
      case 'drone-pet':
        return (
          <g>
            {/* Floating drone companion next to head */}
            <circle cx="155" cy="50" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="155" cy="50" r="6" fill="#06b6d4" />
            <circle cx="157" cy="48" r="2" fill="#ffffff" />
            {/* Drone rotors */}
            <line x1="140" y1="40" x2="170" y2="40" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="140" cy="40" rx="6" ry="1.5" fill="#38bdf8" opacity="0.7" />
            <ellipse cx="170" cy="40" rx="6" ry="1.5" fill="#38bdf8" opacity="0.7" />
            {/* Hover thruster beam */}
            <path d="M 151,64 L 155,75 L 159,64 Z" fill="#38bdf8" opacity="0.6" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`rounded-full overflow-hidden select-none ${className}`}
    >
      <defs>
        <clipPath id="avatarClip">
          <circle cx="100" cy="100" r="95" />
        </clipPath>
      </defs>

      {/* Main Avatar Container with Circular Clip */}
      <g clipPath="url(#avatarClip)">
        {/* Background */}
        {showBackground && renderBackground()}

        {/* Neck */}
        <rect x="91" y="118" width="18" height="24" rx="4" fill={skinTone} />

        {/* Head Base */}
        <circle cx="100" cy="92" r="32" fill={skinTone} />

        {/* Ears */}
        <circle cx="68" cy="92" r="6" fill={skinTone} />
        <circle cx="132" cy="92" r="6" fill={skinTone} />

        {/* Hair Back */}
        {renderHair()}

        {/* Face Elements */}
        {/* Eyebrows */}
        <path d="M 80,78 Q 87,74 94,77" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 106,77 Q 113,74 120,78" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" />

        {/* Eyes */}
        <circle cx="87" cy="86" r="3.5" fill="#0f172a" />
        <circle cx="113" cy="86" r="3.5" fill="#0f172a" />
        <circle cx="88.5" cy="84.5" r="1.2" fill="#ffffff" />
        <circle cx="114.5" cy="84.5" r="1.2" fill="#ffffff" />

        {/* Nose */}
        <path d="M 98,92 Q 100,97 103,96" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Friendly Smile */}
        <path d="M 92,104 Q 100,111 108,104" fill="none" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />

        {/* Cheeks */}
        <circle cx="78" cy="95" r="4.5" fill="#f43f5e" opacity="0.25" />
        <circle cx="122" cy="95" r="4.5" fill="#f43f5e" opacity="0.25" />

        {/* Outfit */}
        {renderOutfit()}

        {/* Accessory on top */}
        {renderAccessory()}
      </g>

      {/* Outer Border Frame */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="4" />
    </svg>
  );
};
