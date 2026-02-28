export default function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { maxWidth: '100px', maxHeight: '60px' },
    default: { maxWidth: '120px', maxHeight: '60px' },
    large: { maxWidth: '450px', maxHeight: '225px' }
  };

  const { maxWidth, maxHeight } = sizes[size];

  return (
    <img 
      src="/logocrop.png"
      alt="INDHU Amusement Ride Industries Logo" 
      style={{ maxWidth, maxHeight, width: '100%', height: 'auto' }}
      className="object-contain"
    />
  );
}
