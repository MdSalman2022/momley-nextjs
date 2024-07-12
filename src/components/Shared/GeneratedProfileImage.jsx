"use client"
function GeneratedProfileImage({ name, size }) {
    function generateBackgroundColor(name) {
      let hash = 0;
      for (let i = 0; i < name?.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = ((hash & 0x00ffffff) | 0x440000).toString(16).toUpperCase();
      return `#${color}`;
    }
  
    const firstLetter = name?.charAt(0).toUpperCase();
    const backgroundColor = generateBackgroundColor(name);
  
    return (
      <div className="flex items-center">
        <div
          className={`rounded-full flex items-center justify-center text-white font-semibold`}
          style={{
            backgroundColor: backgroundColor,
            width: `${size}px`,
            height: `${size}px`,
            fontSize: `${size / 2}px`,
          }}
        >
          {firstLetter}
        </div>
      </div>
    );
  }
  
  export default GeneratedProfileImage;
  