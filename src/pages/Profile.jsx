import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EVAL | Profile";
    
    const fetchUserData = async () => {
      try {
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }
        setUser(user);

        // Get the user's profile data
        const { data: profile, error } = await supabase
          .from('players')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(profile);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
        
        <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-purple-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400">Account Created</p>
                  <p className="font-semibold">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
              {profile ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Full Name</p>
                    <p className="font-semibold">{profile.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">School</p>
                    <p className="font-semibold">{profile.school || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Games Played</p>
                    <p className="font-semibold">
                      {profile.games_played?.join(', ') || 'None selected'}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">No profile information available</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/edit-profile')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/high-school-rankings')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View Rankings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 