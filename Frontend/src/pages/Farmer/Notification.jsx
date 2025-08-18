// File: src/pages/Notification.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { MdNotificationsActive, MdDone } from 'react-icons/md';

const Notification = () => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        toast.error('Failed to load notifications');
      }
    };
    if (token) fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/notifications/mark-read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success('Notification marked as read and deleted');
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  return (
    <motion.div
      className="min-h-screen py-10 px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <MdNotificationsActive /> Notifications
        </h2>
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.p
                className="text-gray-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                You're all caught up!
              </motion.p>
            ) : (
              notifications.map((note, index) => (
                <motion.div
                  key={note._id}
                  className={`flex justify-between items-center bg-white p-4 rounded-xl shadow border-l-4 ${note.read ? 'border-gray-300' : 'border-green-600'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <p className="text-gray-800 font-medium">{note.message}</p>
                    <p className="text-sm text-gray-400">{new Date(note.createdAt).toLocaleString()}</p>
                  </div>
                  {!note.read && (
                    <button
                      onClick={() => markAsRead(note._id)}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
                      title="Mark as read"
                    >
                      <MdDone size={20} />
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Notification;
