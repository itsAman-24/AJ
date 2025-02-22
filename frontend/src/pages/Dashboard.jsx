import { FaCalendar, FaFileAlt, FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);

    // Get appointments
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setUpcomingAppointments(savedAppointments);
  }, []);

  const recentRecords = [
    { id: 1, date: "2024-03-15", type: "Blood Test", status: "Completed" },
    { id: 2, date: "2024-03-10", type: "X-Ray", status: "Available" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back, {currentUser?.name || 'Guest'}!</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <FaCalendar className="text-primary-600" />
          </div>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            ) : (
              upcomingAppointments.slice(0, 2).map(apt => (
                <div key={apt.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-semibold">{apt.doctor}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{apt.date} at {apt.time}</p>
                  <p className="text-sm text-primary-600">{apt.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Records</h2>
            <FaFileAlt className="text-primary-600" />
          </div>
          <div className="space-y-4">
            {recentRecords.map(record => (
              <div key={record.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold">{record.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{record.date}</p>
                <span className="text-sm text-green-600">{record.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <FaBell className="text-primary-600" />
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-semibold">Vaccination Due</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Annual flu shot reminder</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-semibold">New Report Available</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Blood test results are ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;