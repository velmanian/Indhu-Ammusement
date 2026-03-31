export default function Logo({ size = 'default', className = "" }: { size?: 'small' | 'default' | 'large' | 'xlarge', className?: string }) {
  const sizes = {
    small: { maxWidth: '100px', maxHeight: '60px' },
    default: { maxWidth: '120px', maxHeight: '60px' },
    large: { maxWidth: '300px', maxHeight: '150px' },
    xlarge: { maxWidth: '500px', maxHeight: '250px' }
  };

  const { maxWidth, maxHeight } = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/logocrop.png"
        alt="INDHU Amusement Ride Industries Logo" 
        style={{ maxWidth, maxHeight, width: '100%', height: 'auto' }}
        className="object-contain"
      />
    </div>
  );
}
