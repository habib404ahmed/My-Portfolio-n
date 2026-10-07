interface CinematicGlassObjectProps {
  domainId: string
  accentColor: string
  isHovered: boolean
  isClicked: boolean
}

export function CinematicGlassObject({
  domainId,
  accentColor,
  isHovered,
  isClicked,
}: CinematicGlassObjectProps) {
  // Unique gradient and filter IDs to prevent SVG cross-contamination
  const gradId = `glass-grad-${domainId}`
  const glowId = `glass-glow-${domainId}`
  const specularId = `glass-specular-${domainId}`

  return (
    <svg
      viewBox="0 0 240 90"
      className="w-full h-full select-none pointer-events-none transition-transform duration-500 ease-out"
      style={{
        filter: isClicked
          ? `drop-shadow(0 0 24px ${accentColor}) brightness(1.3)`
          : isHovered
          ? `drop-shadow(0 0 16px ${accentColor}80) brightness(1.15)`
          : `drop-shadow(0 4px 12px rgba(0,0,0,0.5))`,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep Translucent Glass Gradient */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isHovered ? 0.16 : 0.09} />
          <stop offset="45%" stopColor={accentColor} stopOpacity={isHovered ? 0.18 : 0.08} />
          <stop offset="100%" stopColor="#060A14" stopOpacity="0.85" />
        </linearGradient>

        {/* Specular Glare Gradient */}
        <linearGradient id={specularId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Soft Radial Core Glow */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity={isHovered ? 0.6 : 0.35} />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Render Category-Specific Floating Glass Object */}
      {(() => {
        switch (domainId) {
          case 'languages':
            return (
              <g transform="translate(120, 45)">
                {/* Ambient Depth Halo */}
                <circle cx="0" cy="0" r="38" fill={`url(#${glowId})`} />

                {/* Outer Glass Sphere / Rounded Capsule Body */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="48"
                  ry="26"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.28)"
                  strokeWidth="1.2"
                />

                {/* Inner Refraction Contour */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="43"
                  ry="22"
                  stroke={accentColor}
                  strokeOpacity={isHovered ? '0.45' : '0.25'}
                  strokeWidth="1"
                />

                {/* Floating Luminous < / > Symbol Inside Glass Chamber */}
                {/* Left bracket < */}
                <path
                  d="M-18 -10 L-26 0 L-18 10"
                  stroke={accentColor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(0 0 6px ${accentColor})`,
                  }}
                />

                {/* Center Slash / */}
                <path
                  d="M4 -12 L-4 12"
                  stroke="#ffffff"
                  strokeOpacity={isHovered ? '0.95' : '0.75'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0 0 4px #ffffff)',
                  }}
                />

                {/* Right bracket > */}
                <path
                  d="M18 -10 L26 0 L18 10"
                  stroke={accentColor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(0 0 6px ${accentColor})`,
                  }}
                />

                {/* Top Specular Glare Highlight on Glass Dome */}
                <path
                  d="M-36 -12 C-20 -20, 20 -20, 36 -12 C18 -15, -18 -15, -36 -12 Z"
                  fill={`url(#${specularId})`}
                />

                {/* Orbital Dust Sparkles */}
                <circle cx="-38" cy="8" r="1.5" fill={accentColor} opacity="0.6" />
                <circle cx="36" cy="-6" r="1" fill="#ffffff" opacity="0.7" />
              </g>
            )

          case 'frontend':
            return (
              <g transform="translate(120, 45)">
                <ellipse cx="0" cy="0" r="36" fill={`url(#${glowId})`} />

                {/* Floating Angled Glass Window Frame */}
                <rect
                  x="-52"
                  y="-24"
                  width="104"
                  height="48"
                  rx="8"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.28)"
                  strokeWidth="1.2"
                />

                {/* Top Glass Window Titlebar */}
                <line x1="-52" y1="-12" x2="52" y2="-12" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1" />
                <circle cx="-42" cy="-18" r="2" fill={accentColor} opacity="0.8" />
                <circle cx="-35" cy="-18" r="2" fill="rgba(255, 255, 255, 0.4)" />
                <circle cx="-28" cy="-18" r="2" fill="rgba(255, 255, 255, 0.4)" />

                {/* Responsive Glass UI Wireframe Panes */}
                <rect x="-42" y="-5" width="22" height="22" rx="3" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                <rect
                  x="-14"
                  y="-5"
                  width="36"
                  height="12"
                  rx="3"
                  fill={accentColor}
                  fillOpacity="0.2"
                  stroke={accentColor}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <rect x="-14" y="11" width="56" height="6" rx="2" fill="rgba(255, 255, 255, 0.08)" />
                <rect x="26" y="-5" width="16" height="12" rx="3" fill="rgba(255, 255, 255, 0.06)" />

                {/* Specular Highlight along Top Edge */}
                <line x1="-48" y1="-23" x2="48" y2="-23" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1" strokeLinecap="round" />
              </g>
            )

          case 'backend':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="36" fill={`url(#${glowId})`} />

                {/* Central Gateway Node with Layered API Conduits */}
                <circle
                  cx="-34"
                  cy="0"
                  r="13"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1.2"
                />
                <circle cx="-34" cy="0" r="5" fill={accentColor} style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }} />

                {/* Branch Conduits */}
                <path d="M-21 0 C-4 0, 4 -16, 20 -16" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 2" />
                <path d="M-21 0 H20" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.8" />
                <path d="M-21 0 C-4 0, 4 16, 20 16" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 2" />

                {/* Microservice Glass Blocks */}
                <g transform="translate(20, -22)">
                  <rect x="0" y="0" width="36" height="12" rx="4" fill={`url(#${gradId})`} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                  <circle cx="7" cy="6" r="2.5" fill="rgba(255, 255, 255, 0.6)" />
                  <line x1="14" y1="6" x2="28" y2="6" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                </g>
                <g transform="translate(20, -6)">
                  <rect x="0" y="0" width="44" height="12" rx="4" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1" strokeOpacity="0.6" />
                  <circle cx="7" cy="6" r="2.5" fill={accentColor} />
                  <line x1="14" y1="6" x2="36" y2="6" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.7" />
                </g>
                <g transform="translate(20, 10)">
                  <rect x="0" y="0" width="36" height="12" rx="4" fill={`url(#${gradId})`} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                  <circle cx="7" cy="6" r="2.5" fill="rgba(255, 255, 255, 0.6)" />
                  <line x1="14" y1="6" x2="28" y2="6" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                </g>
              </g>
            )

          case 'ai-ml':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="38" fill={`url(#${glowId})`} />

                {/* Synaptic Network Connections */}
                <line x1="-38" y1="-14" x2="0" y2="-12" stroke={accentColor} strokeOpacity="0.3" strokeWidth="1" />
                <line x1="-38" y1="-14" x2="0" y2="0" stroke={accentColor} strokeOpacity="0.4" strokeWidth="1" />
                <line x1="-38" y1="0" x2="0" y2="-12" stroke={accentColor} strokeOpacity="0.3" strokeWidth="1" />
                <line x1="-38" y1="0" x2="0" y2="0" stroke={accentColor} strokeOpacity="0.7" strokeWidth="1.5" />
                <line x1="-38" y1="0" x2="0" y2="12" stroke={accentColor} strokeOpacity="0.3" strokeWidth="1" />
                <line x1="-38" y1="14" x2="0" y2="0" stroke={accentColor} strokeOpacity="0.4" strokeWidth="1" />
                <line x1="-38" y1="14" x2="0" y2="12" stroke={accentColor} strokeOpacity="0.3" strokeWidth="1" />

                <line x1="0" y1="-12" x2="38" y2="-7" stroke={accentColor} strokeOpacity="0.4" strokeWidth="1" />
                <line x1="0" y1="0" x2="38" y2="-7" stroke={accentColor} strokeOpacity="0.7" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="38" y2="7" stroke={accentColor} strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="0" y1="12" x2="38" y2="7" stroke={accentColor} strokeOpacity="0.4" strokeWidth="1" />

                {/* Input Layer Glass Nodes */}
                <circle cx="-38" cy="-14" r="4.5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <circle cx="-38" cy="0" r="5" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1.2" />
                <circle cx="-38" cy="14" r="4.5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

                {/* Central Luminous Neural Glass Core */}
                <circle cx="0" cy="-12" r="4.5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <circle
                  cx="0"
                  cy="0"
                  r="9"
                  fill={`url(#${gradId})`}
                  stroke={accentColor}
                  strokeWidth="1.6"
                />
                <circle cx="0" cy="0" r="4.5" fill={accentColor} style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }} />
                <circle cx="0" cy="12" r="4.5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

                {/* Output Glass Nodes */}
                <circle cx="38" cy="-7" r="6" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1.2" />
                <circle cx="38" cy="7" r="5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              </g>
            )

          case 'security':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="36" fill={`url(#${glowId})`} />

                {/* Radar Arc Ring */}
                <circle cx="0" cy="0" r="32" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4 3" />
                <circle cx="0" cy="0" r="22" stroke={accentColor} strokeOpacity="0.2" strokeWidth="1" />

                {/* Faceted Liquid Glass Defensive Shield */}
                <path
                  d="M0 -22 L24 -12 C24 8, 0 24, 0 26 C0 24, -24 8, -24 -12 Z"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />

                {/* Inner Bevel Shield Contour */}
                <path
                  d="M0 -17 L18 -9 C18 6, 0 19, 0 20 C0 19, -18 6, -18 -9 Z"
                  stroke={accentColor}
                  strokeOpacity={isHovered ? '0.6' : '0.35'}
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* Central Cipher Core / Lock */}
                <circle cx="0" cy="0" r="4.5" fill={accentColor} style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }} />
                <path d="M0 4 V10" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />

                {/* Top Specular Edge */}
                <path d="M-20 -10 L0 -20 L20 -10" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" strokeLinecap="round" />
              </g>
            )

          case 'systems':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="34" fill={`url(#${glowId})`} />

                {/* Hardware Silicon CPU Package Frame */}
                <rect
                  x="-36"
                  y="-22"
                  width="72"
                  height="44"
                  rx="6"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.2"
                />

                {/* Raised Glass Heatspreader / Central Microchip Die */}
                <rect
                  x="-16"
                  y="-14"
                  width="32"
                  height="28"
                  rx="4"
                  fill="rgba(6, 10, 20, 0.85)"
                  stroke={accentColor}
                  strokeWidth="1.4"
                />
                <rect
                  x="-8"
                  y="-7"
                  width="16"
                  height="14"
                  rx="2"
                  fill={accentColor}
                  fillOpacity="0.4"
                  style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
                />

                {/* Left Bus Traces */}
                <line x1="-50" y1="-10" x2="-36" y2="-10" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
                <line x1="-54" y1="0" x2="-36" y2="0" stroke={accentColor} strokeOpacity="0.75" strokeWidth="1.4" />
                <line x1="-50" y1="10" x2="-36" y2="10" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
                <circle cx="-54" cy="0" r="2" fill={accentColor} />

                {/* Right Bus Traces */}
                <line x1="36" y1="-10" x2="50" y2="-10" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
                <line x1="36" y1="0" x2="54" y2="0" stroke={accentColor} strokeOpacity="0.75" strokeWidth="1.4" />
                <line x1="36" y1="10" x2="50" y2="10" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
                <circle cx="54" cy="0" r="2" fill={accentColor} />
              </g>
            )

          case 'networking':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="36" fill={`url(#${glowId})`} />

                {/* Optical Mesh Conduit Links */}
                <line x1="-40" y1="0" x2="-14" y2="-16" stroke={accentColor} strokeOpacity="0.45" strokeWidth="1" />
                <line x1="-40" y1="0" x2="-14" y2="16" stroke={accentColor} strokeOpacity="0.45" strokeWidth="1" />
                <line x1="-14" y1="-16" x2="16" y2="0" stroke={accentColor} strokeOpacity="0.75" strokeWidth="1.4" />
                <line x1="-14" y1="16" x2="16" y2="0" stroke={accentColor} strokeOpacity="0.75" strokeWidth="1.4" />
                <line x1="-14" y1="-16" x2="-14" y2="16" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="16" y1="0" x2="44" y2="-10" stroke={accentColor} strokeOpacity="0.5" strokeWidth="1" />
                <line x1="16" y1="0" x2="44" y2="12" stroke={accentColor} strokeOpacity="0.35" strokeWidth="1" />

                {/* Distributed Mesh Glass Nodes */}
                <circle cx="-40" cy="0" r="5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <circle cx="-14" cy="-16" r="5.5" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1.2" />
                <circle cx="-14" cy="16" r="5.5" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1.2" />

                {/* Central Routing Node */}
                <circle cx="16" cy="0" r="8" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1.5" />
                <circle cx="16" cy="0" r="4" fill={accentColor} style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }} />

                <circle cx="44" cy="-10" r="4.5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <circle cx="44" cy="12" r="4" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              </g>
            )

          case 'databases':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="36" fill={`url(#${glowId})`} />

                {/* Layered Glass Data Cylinder Disks */}
                {/* Platter 1 (Top) */}
                <ellipse
                  cx="0"
                  cy="-14"
                  rx="42"
                  ry="10"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.2"
                />
                <ellipse cx="0" cy="-14" rx="20" ry="4.5" fill={accentColor} fillOpacity="0.5" />

                {/* Platter 2 (Middle) */}
                <path d="M-42 -14 V0 C-42 6, 42 6, 42 0 V-14" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="42"
                  ry="10"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />

                {/* Platter 3 (Bottom) */}
                <path d="M-42 0 V14 C-42 20, 42 20, 42 14 V0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
                <ellipse
                  cx="0"
                  cy="14"
                  rx="42"
                  ry="10"
                  fill={`url(#${gradId})`}
                  stroke={accentColor}
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                />

                {/* Vertical Core Data Flux Conduit */}
                <line x1="0" y1="-14" x2="0" y2="14" stroke={accentColor} strokeWidth="1.8" strokeOpacity="0.8" style={{ filter: `drop-shadow(0 0 5px ${accentColor})` }} />

                {/* Specular Edge */}
                <path d="M-36 -17 C-20 -23, 20 -23, 36 -17" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1" fill="none" strokeLinecap="round" />
              </g>
            )

          case 'infrastructure':
            return (
              <g transform="translate(120, 45)">
                <circle cx="0" cy="0" r="38" fill={`url(#${glowId})`} />

                {/* Floating Translucent Cloud Envelope */}
                <path
                  d="M-46 12 H46 C54 12, 60 4, 57 -4 C55 -12, 45 -14, 40 -12 C34 -20, 16 -24, 6 -17 C0 -22, -18 -22, -24 -14 C-30 -14, -42 -9, -41 0 C-47 2, -50 12, -46 12 Z"
                  fill={`url(#${gradId})`}
                  stroke="rgba(255, 255, 255, 0.28)"
                  strokeWidth="1.2"
                />

                {/* Container Deployment Node Blocks */}
                <g transform="translate(-28, -6)">
                  <rect x="0" y="0" width="16" height="15" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <line x1="4" y1="7" x2="12" y2="7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                </g>

                <line x1="-10" y1="1" x2="-2" y2="1" stroke={accentColor} strokeWidth="1.4" />

                <g transform="translate(0, -8)">
                  <rect x="0" y="0" width="18" height="17" rx="3" fill={`url(#${gradId})`} stroke={accentColor} strokeWidth="1.2" />
                  <circle cx="9" cy="8.5" r="3" fill={accentColor} style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }} />
                </g>

                <line x1="20" y1="1" x2="28" y2="1" stroke={accentColor} strokeWidth="1.4" />

                <g transform="translate(30, -6)">
                  <rect x="0" y="0" width="16" height="15" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <line x1="4" y1="7" x2="12" y2="7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                </g>

                {/* Top Specular Arc */}
                <path d="M-20 -15 C-5 -21, 15 -21, 30 -15" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1" fill="none" strokeLinecap="round" />
              </g>
            )

          default:
            return null
        }
      })()}
    </svg>
  )
}
