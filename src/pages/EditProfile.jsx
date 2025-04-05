import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const EditProfile = () => {
  const [player, setPlayer] = useState({
    full_name: '',
    school: '',
    coach_email: '',
    guardian_email: '',
    gpa: '',
    transcript: '',
    trackergg_prof: '',
    games_played: [],
    highest_ranks: {},
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('players')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setPlayer({
            full_name: data.full_name || '',
            school: data.school || '',
            coach_email: data.coach_email || '',
            guardian_email: data.guardian_email || '',
            gpa: data.gpa || '',
            transcript: data.transcript || '',
            trackergg_prof: data.trackergg_prof || '',
            games_played: data.games_played || [],
            highest_ranks: data.highest_ranks || {},
          });
        }
      }
    };

    fetchPlayerData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        games_played: checked
          ? [...prevPlayer.games_played, value]
          : prevPlayer.games_played.filter((game) => game !== value),
      }));
    } else if (name.startsWith('rank_')) {
      const game = name.split('_')[1];
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        highest_ranks: {
          ...prevPlayer.highest_ranks,
          [game]: value,
        },
      }));
    } else {
      setPlayer({ ...player, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not authenticated");
      setLoading(false);
      return;
    }
  
    const updatedPlayer = {
      ...player,
      gpa: parseFloat(player.gpa) || null,
      highest_ranks: player.highest_ranks,
    };
  
    console.log("Updating player data:", updatedPlayer);
  
    const { error } = await supabase
      .from('players')
      .update(updatedPlayer)
      .eq('id', user.id);
  
    setLoading(false);
  
    if (error) {
      console.error('Error updating profile:', error);
    } else {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name: <input type="text" name="full_name" value={player.full_name} onChange={handleChange} /></label>
        <label>School: <input type="text" name="school" value={player.school} onChange={handleChange} /></label>
        <label>Coach Email: <input type="email" name="coach_email" value={player.coach_email} onChange={handleChange} /></label>
        <label>Guardian Email: <input type="email" name="guardian_email" value={player.guardian_email} onChange={handleChange} /></label>
        <label>GPA: <input type="number" step="0.1" name="gpa" value={player.gpa} onChange={handleChange} /></label>
        <label>Transcript: <input type="text" name="transcript" value={player.transcript} onChange={handleChange} /></label>
        <label>TrackerGG Profile: <input type="text" name="trackergg_prof" value={player.trackergg_prof} onChange={handleChange} /></label>
        
        <label>Games Played:</label>
        <div>
          {['Valorant', 'Rocket League', 'Super Smash', 'Overwatch'].map((game) => (
            <div key={game}>
              <label>
                <input
                  type="checkbox"
                  name="games_played"
                  value={game}
                  checked={player.games_played.includes(game)}
                  onChange={handleChange}
                />
                {game}
              </label>
              {player.games_played.includes(game) && (
                <input
                  type="text"
                  name={`rank_${game}`}
                  placeholder={`Highest Rank in ${game}`}
                  value={player.highest_ranks[game] || ''}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
