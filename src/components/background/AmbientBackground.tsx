import Image from "next/image";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      {/* Base Global Background Texture */}
      <div className="absolute inset-0 bg-primary" />
      
      {/* Very subtle background image across the whole page to prevent flat colors */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-luminosity">
        <Image
          src="/images/story_bg_1787075461396.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      
      {/* Global gradient overlays to ensure text remains readable and sections blend naturally */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary/95" />
      
      {/* Dynamic Orbs for localized atmospheric lighting */}
      <div className="ambient-orb orb-primary w-[40vw] h-[40vw] top-[-10%] left-[-10%]" />
      <div className="ambient-orb orb-secondary w-[30vw] h-[30vw] top-[40%] right-[-5%]" style={{ animationDelay: '-5s' }} />
      <div className="ambient-orb orb-primary w-[35vw] h-[35vw] bottom-[-10%] left-[20%]" style={{ animationDelay: '-10s' }} />
      
      {/* Base Noise Texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjgiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
    </div>
  );
}
