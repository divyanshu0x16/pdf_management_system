import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getPDFs, uploadPDF } from '../services/pdf';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [pdfs, setPDFs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.username);
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await getPDFs();
      setPDFs(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File size exceeds the limit (2MB)');
      return;
    }

    const fileType = file.type;
    if (fileType !== 'application/pdf') {
      setUploadError('Only PDF files are allowed');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const response = await uploadPDF(file, username);
      setPDFs((prevPDFs) => [...prevPDFs, response.data]);
      event.target.value = null; // Reset file input
    } catch (error) {
      setUploadError('Failed to upload the file');
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-4"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="w-full max-w-md mb-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}
      </div>
      <div className="w-full max-w-md">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="bg-white rounded shadow p-4 mb-4 flex items-center justify-between"
          >
            <div className="text-lg font-semibold">{pdf.filename}</div>
            <div className="text-gray-500">{pdf.uploadDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
