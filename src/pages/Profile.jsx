import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function Profile({ user, onUpdateProfile }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: 'O+',
    allergies: '',
    emergencyContact: ''
  });

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...profile } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    onUpdateProfile({ ...user, ...profile });
    
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="input"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="input"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                className="input"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-2">Blood Group</label>
              <select
                className="input"
                value={profile.bloodGroup}
                onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Allergies</label>
              <textarea
                className="input"
                value={profile.allergies}
                onChange={(e) => setProfile({...profile, allergies: e.target.value})}
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2">Emergency Contact</label>
              <input
                type="text"
                className="input"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                placeholder="Name - Phone Number"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;