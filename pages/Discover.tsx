import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const collectionCopy: Record<string, { title: string; intro: string }> = {
  venues: { title: 'Venues', intro: 'Explore spaces that fit your celebration, guest count and budget.' },
  photos: { title: 'Wedding Photos', intro: 'Browse ceremony, decor and portrait inspiration.' },
  'real-weddings': { title: 'Real Weddings', intro: 'Discover complete celebrations and their planning details.' },
  blog: { title: 'Wedding Blog', intro: 'Read practical guides for every stage of planning.' },
  'e-invites': { title: 'E-Invites', intro: 'Find digital invitation styles for every wedding event.' },
};

export function Discover() {
  const { category = 'venues' } = useParams();
  const copy = collectionCopy[category] ?? collectionCopy.venues;
  const cards = [
    ['Editorial', 'A refined celebration', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85'],
    ['Modern', 'Fresh details and color', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85'],
    ['Classic', 'Timeless ceremony ideas', 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=900&q=85'],
  ];

  return (
    <main className="discover-page page-shell">
      <div className="directory-heading"><span className="eyebrow">CURATED FOR YOUR CELEBRATION</span><h1>{copy.title}</h1><p>{copy.intro}</p></div>
      <div className="discover-grid">
        {cards.map(([label, title, image]) => <article key={title}><img src={image} alt={title} /><span>{label}</span><h2>{title}</h2><Link to="/vendors/hyderabad">Explore relevant vendors <ArrowRight size={17} /></Link></article>)}
      </div>
    </main>
  );
}
