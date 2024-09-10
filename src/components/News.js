import React, { useState } from "react";
import "./News.css";

const newsArticles = [
  {
    title: "Novità sul tempo: Estate 2024",
    content: "Previsioni meteo per l'estate 2024 con temperature in aumento...",
    detailedContent:
      "L'estate 2024 si prevede calda con temperature che supereranno la media stagionale in diverse regioni. Gli esperti suggeriscono di prepararsi per possibili ondate di calore e di considerare misure di prevenzione per la salute.",
    image:
      "https://plus.unsplash.com/premium_photo-1681255760839-6581e2eb3e96?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Come il cambiamento climatico sta influenzando il nostro meteo",
    content: "Un'analisi dettagliata su come il clima sta cambiando...",
    detailedContent:
      "Il cambiamento climatico sta portando a variazioni significative nei modelli meteorologici globali, con un aumento della frequenza di eventi estremi come uragani, alluvioni e siccità. Questo articolo esplora le cause e le conseguenze di questi cambiamenti.",
    image:
      "https://plus.unsplash.com/premium_photo-1674583193467-2e012da460ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Prepararsi per l'inverno 2024: Consigli e previsioni",
    content: "Le previsioni meteo per l'inverno 2024 e come prepararsi...",
    detailedContent:
      "L'inverno 2024 si prevede rigido in molte parti del mondo. Ecco alcuni consigli su come prepararsi: assicurarsi di avere una buona scorta di cibo e acqua, proteggere le tubature dal gelo e preparare la propria auto per le condizioni invernali.",
    image:
      "https://plus.unsplash.com/premium_photo-1670598342794-249547599860?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Gli effetti della primavera anticipata: Cosa aspettarsi",
    content: "Un'analisi sugli effetti della primavera anticipata nel 2024...",
    detailedContent:
      "La primavera anticipata può influenzare negativamente l'agricoltura e la biodiversità. Le colture potrebbero fiorire prima del previsto, esponendosi al rischio di gelate tardive, mentre alcuni animali potrebbero non adattarsi in tempo ai cambiamenti climatici.",
    image:
      "https://plus.unsplash.com/premium_photo-1674917070243-905c3bbf1576?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const News = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="news">
      <h2>News</h2>
      <div className="news-cards">
        {newsArticles.map((article, index) => (
          <div
            key={index}
            className="news-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={article.image} alt={article.title} />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <button
                className="read-more-button"
                onClick={() => handleReadMore(index)}
              >
                {expandedIndex === index ? "Mostra meno" : "Leggi di più"}
              </button>
              {expandedIndex === index && (
                <div className="news-detailed-content">
                  <p>{article.detailedContent}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
