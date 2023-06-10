import axios from 'axios';

export const getPDFs = async () => {
  try {
    const response = await axios.get('/api/pdfs'); 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch PDFs');
  }
};

export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }); 

    return response.data;
  } catch (error) {
    throw new Error('Failed to upload PDF');
  }
};
