import { useEffect, useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';

export type Vendor = {
  id: number;
  name: string;
  rating: number;
  location: string;
  price: string;
  images: string[];
};

export function VendorCard({ vendor }: { vendor: Vendor }) {
  const storageKey = `vivahasetu-saved-vendor-${vendor.id}`;
  const [saved, setSaved] = useState(() => localStorage.getItem(storageKey) === 'true');
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, String(saved));
  }, [saved, storageKey]);

  return (
    <article className="vendor-card">
      <div className="vendor-image-wrap">
        <img src={vendor.images[slide]} alt={`${vendor.name} wedding vendor`} />
        <button className={`favorite-button ${saved ? 'favorite-button--active' : ''}`} onClick={() => setSaved((value) => !value)} aria-label={saved ? 'Remove saved vendor' : 'Save vendor'} aria-pressed={saved}>
          <Heart size={19} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <span className="rating-badge"><Star size={14} fill="currentColor" /> {vendor.rating.toFixed(1)}</span>
        {vendor.images.length > 1 && (
          <div className="carousel-dots">
            {vendor.images.map((_, index) => <button key={index} aria-label={`Show image ${index + 1}`} className={slide === index ? 'active' : ''} onClick={() => setSlide(index)} />)}
          </div>
        )}
      </div>
      <div className="vendor-card-body">
        <h3>{vendor.name}</h3>
        <p><MapPin size={15} /> {vendor.location}</p>
        <strong>{vendor.price}</strong>
      </div>
    </article>
  );
}

export function VendorGrid({ vendors }: { vendors: Vendor[] }) {
  return <div className="vendor-grid">{vendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}</div>;
}
