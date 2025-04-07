import React from 'react';
import { useLocation } from 'react-router-dom';
import PlayerRankings from '../components/PlayerRankings';

const Valorant = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialView = queryParams.get('view');

  return (
    <div className="w-full bg-[#0f0f1a] text-white py-16">
      {/* Rankings Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Valorant Rankings</h2>
        <PlayerRankings initialView={initialView} />
      </section>
    </div>
  );
};

export default Valorant;
