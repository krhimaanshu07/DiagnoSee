import { useState, useEffect } from "react";

const newsItems = [
  "🚀 DiagnoSee AI now processes over 500K medical images daily across 50+ healthcare systems",
  "📱 New Mobile App: Access DiagnoSee enhancement tools on iOS and Android devices",
  "🏆 FDA Clearance: DiagnoSee receives FDA 510(k) clearance for X-Ray super-resolution technology",
  "💡 Research Partnership: Collaborating with top medical universities for next-gen AI imaging",
  "🌍 Global Expansion: DiagnoSee now available in 25+ countries worldwide"
];

export default function NewsStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-strip">
      <div className="news-strip-container">
        <div className="news-label">
          <i className="fas fa-newspaper text-primary"></i>
          <span>Latest News</span>
        </div>
        <div className="news-content">
          <div className="news-ticker">
            {newsItems[currentIndex]}
          </div>
        </div>
        <div className="news-controls">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
            className="news-nav-btn"
            aria-label="Previous news"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % newsItems.length)}
            className="news-nav-btn"
            aria-label="Next news"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}