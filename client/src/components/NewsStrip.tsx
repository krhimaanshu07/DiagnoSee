import { useState, useEffect } from "react";

const newsText = "🚀 DiagnoSee AI processes 500K+ medical images daily • 📱 New Mobile App now available on iOS & Android • 🏆 FDA 510(k) clearance for X-Ray super-resolution • 💡 Partnership with top medical universities • 🌍 Now available in 25+ countries worldwide • ⚡ Real-time AI enhancement for all imaging modalities • 🔒 HIPAA-compliant cloud infrastructure • 📊 99.9% uptime with enterprise-grade security • 🎯 Sub-second processing for critical diagnostics • 🚀 DiagnoSee AI processes 500K+ medical images daily • 📱 New Mobile App now available on iOS & Android • 🏆 FDA 510(k) clearance for X-Ray super-resolution • 💡 Partnership with top medical universities • 🌍 Now available in 25+ countries worldwide • ⚡ Real-time AI enhancement for all imaging modalities • 🔒 HIPAA-compliant cloud infrastructure • 📊 99.9% uptime with enterprise-grade security • 🎯 Sub-second processing for critical diagnostics";

export default function NewsStrip() {
  return (
    <div className="news-strip">
      <div className="news-strip-container">
        <div className="news-label">
          <i className="fas fa-newspaper text-primary"></i>
          <span>Latest News</span>
        </div>
        <div className="news-content">
          <div className="news-ticker">
            {newsText}
          </div>
        </div>
      </div>
    </div>
  );
}