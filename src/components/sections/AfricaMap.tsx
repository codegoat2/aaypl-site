import { useState } from 'react'

interface Country {
  id: string
  name: string
  region: string
  d: string
}

const africaCountries: Country[] = [
  { id: 'DZ', name: 'Algeria', region: 'North Africa', d: 'M 270 60 L 290 58 L 320 62 L 335 80 L 330 110 L 310 120 L 280 118 L 265 100 L 260 80 Z' },
  { id: 'EG', name: 'Egypt', region: 'North Africa', d: 'M 340 58 L 375 55 L 390 70 L 385 95 L 360 98 L 335 92 L 330 75 Z' },
  { id: 'LY', name: 'Libya', region: 'North Africa', d: 'M 290 58 L 320 55 L 335 58 L 335 80 L 330 110 L 300 115 L 280 118 Z' },
  { id: 'MA', name: 'Morocco', region: 'North Africa', d: 'M 230 50 L 268 48 L 270 60 L 265 80 L 245 85 L 225 75 L 220 62 Z' },
  { id: 'TN', name: 'Tunisia', region: 'North Africa', d: 'M 270 45 L 285 43 L 290 55 L 285 65 L 270 62 Z' },
  { id: 'MR', name: 'Mauritania', region: 'West Africa', d: 'M 205 75 L 245 70 L 265 80 L 260 110 L 240 120 L 210 115 L 200 95 Z' },
  { id: 'ML', name: 'Mali', region: 'West Africa', d: 'M 245 70 L 280 68 L 290 85 L 285 120 L 260 130 L 240 125 L 240 120 L 260 110 Z' },
  { id: 'NE', name: 'Niger', region: 'West Africa', d: 'M 285 70 L 320 68 L 340 90 L 335 120 L 310 128 L 285 125 L 280 100 L 285 85 Z' },
  { id: 'SN', name: 'Senegal', region: 'West Africa', d: 'M 190 100 L 215 98 L 220 112 L 205 118 L 188 112 Z' },
  { id: 'GN', name: 'Guinea', region: 'West Africa', d: 'M 200 115 L 220 112 L 228 125 L 215 132 L 198 128 Z' },
  { id: 'GH', name: 'Ghana', region: 'West Africa', d: 'M 240 130 L 258 128 L 262 145 L 248 150 L 236 145 Z' },
  { id: 'NG', name: 'Nigeria', region: 'West Africa', d: 'M 278 125 L 315 120 L 322 145 L 308 158 L 280 155 L 268 145 L 270 130 Z' },
  { id: 'CM', name: 'Cameroon', region: 'Central Africa', d: 'M 315 125 L 340 118 L 350 138 L 338 155 L 318 158 L 310 145 Z' },
  { id: 'SD', name: 'Sudan', region: 'North Africa', d: 'M 345 92 L 390 90 L 400 115 L 395 150 L 370 162 L 345 155 L 338 130 L 340 105 Z' },
  { id: 'SS', name: 'South Sudan', region: 'East Africa', d: 'M 345 155 L 390 150 L 395 172 L 375 180 L 350 178 L 340 165 Z' },
  { id: 'ET', name: 'Ethiopia', region: 'East Africa', d: 'M 390 145 L 425 138 L 435 158 L 420 178 L 395 185 L 378 175 L 375 158 Z' },
  { id: 'KE', name: 'Kenya', region: 'East Africa', d: 'M 390 178 L 420 175 L 428 195 L 412 208 L 392 205 L 385 192 Z' },
  { id: 'TZ', name: 'Tanzania', region: 'East Africa', d: 'M 375 200 L 415 195 L 422 220 L 405 235 L 378 230 L 368 215 Z' },
  { id: 'CD', name: 'DR Congo', region: 'Central Africa', d: 'M 318 158 L 365 155 L 380 178 L 375 215 L 350 225 L 322 218 L 310 195 L 312 172 Z' },
  { id: 'AO', name: 'Angola', region: 'Southern Africa', d: 'M 315 218 L 360 215 L 368 240 L 355 258 L 325 255 L 310 240 Z' },
  { id: 'ZM', name: 'Zambia', region: 'Southern Africa', d: 'M 358 220 L 395 215 L 400 240 L 385 255 L 358 252 L 348 238 Z' },
  { id: 'ZW', name: 'Zimbabwe', region: 'Southern Africa', d: 'M 372 248 L 400 244 L 405 262 L 390 272 L 368 268 Z' },
  { id: 'MZ', name: 'Mozambique', region: 'East Africa', d: 'M 398 225 L 420 220 L 428 250 L 415 275 L 395 270 L 390 248 Z' },
  { id: 'ZA', name: 'South Africa', region: 'Southern Africa', d: 'M 335 265 L 390 258 L 405 275 L 395 300 L 360 308 L 330 295 L 320 278 Z' },
  { id: 'NA', name: 'Namibia', region: 'Southern Africa', d: 'M 310 255 L 340 250 L 345 278 L 330 292 L 308 285 Z' },
  { id: 'BW', name: 'Botswana', region: 'Southern Africa', d: 'M 345 258 L 375 252 L 378 278 L 360 288 L 340 282 Z' },
  { id: 'MG', name: 'Madagascar', region: 'East Africa', d: 'M 430 205 L 445 200 L 452 225 L 445 248 L 428 245 L 422 228 Z' },
  { id: 'UG', name: 'Uganda', region: 'East Africa', d: 'M 375 178 L 395 175 L 400 192 L 382 198 L 370 192 Z' },
  { id: 'RW', name: 'Rwanda', region: 'East Africa', d: 'M 375 192 L 388 190 L 390 200 L 376 202 Z' },
  { id: 'SO', name: 'Somalia', region: 'East Africa', d: 'M 420 145 L 445 135 L 455 165 L 440 188 L 420 182 L 415 162 Z' },
  { id: 'LR', name: 'Liberia', region: 'West Africa', d: 'M 205 132 L 220 130 L 225 142 L 210 148 L 200 142 Z' },
  { id: 'CI', name: "Côte d'Ivoire", region: 'West Africa', d: 'M 218 128 L 240 125 L 242 142 L 228 150 L 212 145 L 215 132 Z' },
  { id: 'BF', name: 'Burkina Faso', region: 'West Africa', d: 'M 242 118 L 268 115 L 272 128 L 255 132 L 238 130 Z' },
  { id: 'CF', name: 'Central African Republic', region: 'Central Africa', d: 'M 320 138 L 360 132 L 368 152 L 348 160 L 318 158 Z' },
  { id: 'TG', name: 'Togo', region: 'West Africa', d: 'M 258 125 L 265 122 L 268 138 L 260 142 L 255 132 Z' },
  { id: 'BJ', name: 'Benin', region: 'West Africa', d: 'M 262 122 L 275 118 L 278 135 L 265 138 L 260 125 Z' },
  { id: 'ER', name: 'Eritrea', region: 'East Africa', d: 'M 385 130 L 410 122 L 415 138 L 395 145 L 380 140 Z' },
  { id: 'DJ', name: 'Djibouti', region: 'East Africa', d: 'M 415 140 L 425 138 L 428 148 L 415 150 Z' },
  { id: 'MW', name: 'Malawi', region: 'East Africa', d: 'M 390 228 L 402 224 L 406 245 L 394 248 Z' },
  { id: 'LS', name: 'Lesotho', region: 'Southern Africa', d: 'M 360 290 L 372 286 L 374 296 L 363 300 Z' },
  { id: 'SZ', name: 'Eswatini', region: 'Southern Africa', d: 'M 382 280 L 392 278 L 393 286 L 383 288 Z' },
  { id: 'GA', name: 'Gabon', region: 'Central Africa', d: 'M 305 158 L 322 155 L 326 175 L 310 178 L 300 168 Z' },
  { id: 'CG', name: 'Republic of Congo', region: 'Central Africa', d: 'M 318 158 L 340 152 L 345 175 L 325 182 L 312 175 Z' },
  { id: 'GQ', name: 'Equatorial Guinea', region: 'Central Africa', d: 'M 310 148 L 322 145 L 324 158 L 310 160 Z' },
  { id: 'TD', name: 'Chad', region: 'Central Africa', d: 'M 315 92 L 348 88 L 355 118 L 340 132 L 312 130 L 308 110 Z' },
  { id: 'LY2', name: 'Libya', region: 'North Africa', d: '' },
]

const regionColors: Record<string, string> = {
  'North Africa': '#1e3a5f',
  'West Africa': '#1a3a2a',
  'East Africa': '#2d1a0e',
  'Central Africa': '#1a2535',
  'Southern Africa': '#2a1a35',
}

export default function AfricaMap() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string; region: string } | null>(null)

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (hovered) {
      const country = africaCountries.find(c => c.id === hovered)
      if (country) {
        setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, name: country.name, region: country.region })
      }
    }
  }

  return (
    <div className="relative" role="img" aria-label="Map of Africa showing AAYPL's continental operational area">
      <div className="bg-navy-950 rounded-2xl p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-navy-800/30 to-transparent" aria-hidden="true" />

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4" aria-hidden="true">
          {Object.entries(regionColors).map(([region, color]) => (
            <div key={region} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: color, border: '1px solid rgba(201,150,26,0.3)' }}
              />
              <span className="text-white/50 text-[10px] font-medium">{region}</span>
            </div>
          ))}
        </div>

        {/* SVG Map */}
        <svg
          viewBox="180 40 290 280"
          className="w-full max-w-md mx-auto"
          style={{ filter: 'drop-shadow(0 0 20px rgba(201,150,26,0.1))' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setHovered(null); setTooltip(null) }}
          aria-hidden="true"
        >
          {africaCountries.filter(c => c.d).map((country) => (
            <path
              key={country.id}
              d={country.d}
              fill={hovered === country.id ? '#c9961a' : regionColors[country.region] || '#1a2535'}
              stroke="rgba(201,150,26,0.25)"
              strokeWidth="0.8"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={(e) => {
                  const rect = e.currentTarget.closest('svg')?.getBoundingClientRect()
                  setHovered(country.id)
                  if (rect) {
                    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, name: country.name, region: country.region })
                  }
                }}
              onMouseLeave={() => setHovered(null)}
              role="button"
              tabIndex={0}
              aria-label={`${country.name} – ${country.region}`}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip && hovered && (
          <div
            className="absolute pointer-events-none bg-navy-900 border border-gold-500/30 text-white px-3 py-2 rounded-lg shadow-lg text-xs z-10"
            style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
            aria-hidden="true"
          >
            <p className="font-bold">{tooltip.name}</p>
            <p className="text-white/50">{tooltip.region}</p>
          </div>
        )}

        {/* Note */}
        <p className="mt-4 text-center text-white/30 text-[10px] leading-relaxed">
          AAYPL's mandate covers all 54 African Union member states.<br />
          National chapters established subject to constitutional procedures.
        </p>
      </div>
    </div>
  )
}
