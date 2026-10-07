interface CategoryAbstractVisualProps {
  domainId: string
  color: string
}

export function CategoryAbstractVisual({ domainId, color }: CategoryAbstractVisualProps) {
  switch (domainId) {
    case 'languages':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] text-slate-400 select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Background */}
          <path d="M10 30 H190" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          
          {/* Left Bracket */}
          <path
            d="M38 16 L24 30 L38 44"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Code Stream Elements */}
          <g transform="translate(48, 18)">
            <rect x="0" y="4" width="32" height="4" rx="2" fill={color} fillOpacity="0.4" />
            <rect x="38" y="4" width="18" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
            <rect x="12" y="14" width="46" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="64" y="14" width="22" height="4" rx="2" fill={color} fillOpacity="0.6" />
            <circle cx="94" cy="16" r="2.5" fill={color} className="animate-pulse" />
          </g>

          {/* Right Bracket */}
          <path
            d="M162 16 L176 30 L162 44"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
        </svg>
      )

    case 'frontend':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] text-slate-400 select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Miniature Browser / UI Window Frame */}
          <rect
            x="35"
            y="10"
            width="130"
            height="42"
            rx="6"
            stroke={color}
            strokeWidth="1.2"
            strokeOpacity="0.6"
            fill="rgba(255,255,255,0.02)"
          />
          {/* Header Bar */}
          <path d="M35 20 H165" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="43" cy="15" r="1.5" fill={color} opacity="0.8" />
          <circle cx="48" cy="15" r="1.5" fill="rgba(255,255,255,0.3)" />
          <circle cx="53" cy="15" r="1.5" fill="rgba(255,255,255,0.3)" />
          {/* Layout Columns */}
          <rect x="42" y="25" width="28" height="20" rx="3" fill="rgba(255,255,255,0.06)" />
          <rect x="74" y="25" width="40" height="20" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="118" y="25" width="40" height="20" rx="3" fill="rgba(255,255,255,0.06)" />
        </svg>
      )

    case 'backend':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gateway Node */}
          <circle cx="40" cy="30" r="8" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
          <circle cx="40" cy="30" r="3" fill={color} className="animate-pulse" />

          {/* Conduit Branch Lines */}
          <path d="M48 30 C75 30, 85 18, 105 18" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7" />
          <path d="M48 30 H105" stroke={color} strokeWidth="1.2" opacity="0.7" />
          <path d="M48 30 C75 30, 85 42, 105 42" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7" />

          {/* Microservice Worker Nodes */}
          <g transform="translate(105, 12)">
            <rect x="0" y="0" width="48" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="8" cy="6" r="2" fill={color} />
            <line x1="16" y1="6" x2="38" y2="6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          </g>
          <g transform="translate(105, 24)">
            <rect x="0" y="0" width="56" height="12" rx="3" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="8" cy="6" r="2" fill={color} />
            <line x1="16" y1="6" x2="46" y2="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          </g>
          <g transform="translate(105, 36)">
            <rect x="0" y="0" width="48" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="8" cy="6" r="2" fill={color} />
            <line x1="16" y1="6" x2="38" y2="6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          </g>
        </svg>
      )

    case 'ai-ml':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Synapses (Lines) */}
          <line x1="45" y1="18" x2="100" y2="15" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="45" y1="18" x2="100" y2="30" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="45" y1="30" x2="100" y2="15" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="45" y1="30" x2="100" y2="30" stroke={color} strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="45" y1="30" x2="100" y2="45" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="45" y1="42" x2="100" y2="30" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="45" y1="42" x2="100" y2="45" stroke={color} strokeOpacity="0.3" strokeWidth="1" />

          <line x1="100" y1="15" x2="155" y2="22" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
          <line x1="100" y1="30" x2="155" y2="22" stroke={color} strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="100" y1="30" x2="155" y2="38" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
          <line x1="100" y1="45" x2="155" y2="38" stroke={color} strokeOpacity="0.4" strokeWidth="1" />

          {/* Input Layer */}
          <circle cx="45" cy="18" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx="45" cy="30" r="4.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
          <circle cx="45" cy="42" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

          {/* Hidden Layer */}
          <circle cx="100" cy="15" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx="100" cy="30" r="6" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5" className="animate-pulse" />
          <circle cx="100" cy="45" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

          {/* Output Layer */}
          <circle cx="155" cy="22" r="5" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.5" />
          <circle cx="155" cy="38" r="4" fill="rgba(255,255,255,0.2)" stroke={color} strokeWidth="1" />
        </svg>
      )

    case 'security':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radar Ring */}
          <circle cx="100" cy="30" r="22" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="30" r="14" stroke={color} strokeOpacity="0.25" strokeWidth="1" />

          {/* Shield Geometry */}
          <path
            d="M100 13 L118 20 C118 34, 100 45, 100 47 C100 45, 82 34, 82 20 Z"
            fill={color}
            fillOpacity="0.12"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* Inner Core Lock Dot */}
          <circle cx="100" cy="27" r="3.5" fill={color} className="animate-pulse" />
          <path d="M100 30 V35" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

          {/* Directional Perimeter Rays */}
          <line x1="50" y1="30" x2="72" y2="30" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="128" y1="30" x2="150" y2="30" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )

    case 'systems':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hardware CPU Die */}
          <rect
            x="86"
            y="16"
            width="28"
            height="28"
            rx="4"
            fill={color}
            fillOpacity="0.15"
            stroke={color}
            strokeWidth="1.5"
          />
          <rect x="94" y="24" width="12" height="12" rx="2" fill={color} fillOpacity="0.6" className="animate-pulse" />

          {/* Left Pins & Traces */}
          <line x1="55" y1="22" x2="86" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          <line x1="45" y1="30" x2="86" y2="30" stroke={color} strokeOpacity="0.7" strokeWidth="1.2" />
          <line x1="55" y1="38" x2="86" y2="38" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          <circle cx="45" cy="30" r="2" fill={color} />

          {/* Right Pins & Traces */}
          <line x1="114" y1="22" x2="145" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          <line x1="114" y1="30" x2="155" y2="30" stroke={color} strokeOpacity="0.7" strokeWidth="1.2" />
          <line x1="114" y1="38" x2="145" y2="38" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          <circle cx="155" cy="30" r="2" fill={color} />
        </svg>
      )

    case 'networking':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mesh Interconnects */}
          <line x1="40" y1="30" x2="80" y2="18" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
          <line x1="40" y1="30" x2="80" y2="42" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
          <line x1="80" y1="18" x2="120" y2="30" stroke={color} strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="80" y1="42" x2="120" y2="30" stroke={color} strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="80" y1="18" x2="80" y2="42" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="120" y1="30" x2="160" y2="22" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
          <line x1="120" y1="30" x2="160" y2="40" stroke={color} strokeOpacity="0.3" strokeWidth="1" />

          {/* Network Nodes */}
          <circle cx="40" cy="30" r="4.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx="80" cy="18" r="4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
          <circle cx="80" cy="42" r="4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
          <circle cx="120" cy="30" r="6" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" className="animate-pulse" />
          <circle cx="160" cy="22" r="3.5" fill={color} />
          <circle cx="160" cy="40" r="3" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      )

    case 'databases':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Isometric Data Cylinder Disk Stack */}
          {/* Disk 1 (Top) */}
          <ellipse cx="100" cy="18" rx="34" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4" />
          <ellipse cx="100" cy="18" rx="14" ry="3" fill={color} fillOpacity="0.6" className="animate-pulse" />

          {/* Disk 2 (Middle) */}
          <path d="M66 18 V28 C66 32, 134 32, 134 28 V18" stroke={color} strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
          <ellipse cx="100" cy="28" rx="34" ry="7" fill="rgba(255,255,255,0.03)" stroke={color} strokeOpacity="0.3" strokeWidth="1" />

          {/* Disk 3 (Bottom) */}
          <path d="M66 28 V38 C66 42, 134 42, 134 38 V28" stroke={color} strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
          <ellipse cx="100" cy="38" rx="34" ry="7" fill="rgba(255,255,255,0.04)" stroke={color} strokeOpacity="0.6" strokeWidth="1.2" />

          {/* Lateral Telemetry Links */}
          <line x1="50" y1="28" x2="62" y2="28" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <line x1="138" y1="28" x2="150" y2="28" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        </svg>
      )

    case 'infrastructure':
      return (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full max-h-[56px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Outline Contour */}
          <path
            d="M60 38 H140 C146 38, 152 32, 150 26 C148 20, 140 18, 135 20 C130 14, 116 12, 108 17 C103 14, 90 14, 85 20 C80 20, 70 24, 71 30 C66 31, 56 32, 60 38 Z"
            fill={color}
            fillOpacity="0.08"
            stroke={color}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />

          {/* Container Packaging Nodes */}
          <g transform="translate(74, 22)">
            <rect x="0" y="0" width="14" height="14" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <path d="M4 7 H10" stroke={color} strokeWidth="1" />
          </g>
          <line x1="91" y1="29" x2="97" y2="29" stroke={color} strokeWidth="1.2" />
          <g transform="translate(100, 22)">
            <rect x="0" y="0" width="14" height="14" rx="2" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
            <circle cx="7" cy="7" r="2.5" fill={color} className="animate-pulse" />
          </g>
          <line x1="117" y1="29" x2="123" y2="29" stroke={color} strokeWidth="1.2" />
          <g transform="translate(126, 22)">
            <rect x="0" y="0" width="14" height="14" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <path d="M4 7 H10" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </g>
        </svg>
      )

    default:
      return null
  }
}
