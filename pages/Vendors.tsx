import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { VendorGrid, type Vendor } from '../components/VendorCard';

const vendors: Vendor[] = [
  { id: 1, name: 'Sharan ss', rating: 5, location: 'Hyderabad', price: '₹ 10,000 onwards', images: ['https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85'] },
  { id: 2, name: 'Shailaja Puri Dance Studio', rating: 5, location: 'Hyderabad', price: '₹ 45,000 onwards', images: ['https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85'] },
  { id: 3, name: 'Dance Nation Academy', rating: 5, location: 'Hyderabad', price: '₹ 40,000 onwards', images: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85'] },
  { id: 4, name: 'Makeup Artist Rishika', rating: 5, location: 'Hyderabad', price: '₹ 12,000', images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=85'] },
  { id: 5, name: 'Benazir Khan Makeovers', rating: 4.8, location: 'Hyderabad', price: '₹ 12,000', images: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85'] },
  { id: 6, name: 'Makeover by Tanvi', rating: 5, location: 'Gachibowli, Hyderabad', price: '₹ 8,000', images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=85'] },
  { id: 7, name: 'Pixel Gravity', rating: 5, location: 'Gachibowli, Hyderabad', price: '₹ 15,000 onwards', images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85'] },
  { id: 8, name: 'Rainbow Kiran Studio', rating: 4.9, location: 'KPHB, Hyderabad', price: '₹ 10,000 onwards', images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85'] },
];

export function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minimumRating, setMinimumRating] = useState(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price'>('recommended');
  const filtered = vendors
    .filter((vendor) => `${vendor.name} ${vendor.location}`.toLowerCase().includes(query.toLowerCase()) && vendor.rating >= minimumRating)
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : sortBy === 'price' ? Number(a.price.match(/\d+/)?.[0] ?? 0) - Number(b.price.match(/\d+/)?.[0] ?? 0) : a.id - b.id);

  function updateQuery(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set('q', value); else params.delete('q');
    setSearchParams(params, { replace: true });
  }
  return (
    <main className="directory-page page-shell">
      <section className="directory-heading"><div><span className="eyebrow">HYDERABAD · WEDDING DIRECTORY</span><h1>Find trusted wedding vendors</h1><p>Compare portfolios, ratings and transparent starting prices.</p></div></section>
      <div className="directory-toolbar"><label><Search size={18} /><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search vendors or localities" /></label><button onClick={() => setFiltersOpen((value) => !value)} aria-expanded={filtersOpen}><SlidersHorizontal size={18} /> Filters</button></div>
      {filtersOpen && (
        <div className="directory-filters">
          <label>Minimum rating<select value={minimumRating} onChange={(event) => setMinimumRating(Number(event.target.value))}><option value="0">All ratings</option><option value="4.5">4.5 and above</option><option value="4.8">4.8 and above</option><option value="5">5.0 only</option></select></label>
          <label>Sort by<select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)}><option value="recommended">Recommended</option><option value="rating">Highest rating</option><option value="price">Lowest starting price</option></select></label>
          <button onClick={() => { setMinimumRating(0); setSortBy('recommended'); }}>Clear filters</button>
        </div>
      )}
      <div className="directory-meta"><strong>{filtered.length} vendors</strong><span>Sorted by recommendations</span></div>
      <VendorGrid vendors={filtered} />
    </main>
  );
}
