import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { IoCloudUploadOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import './FileUpload.css';
import axios from 'axios';

const FileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [windows, setWindows] = useState("60");
  const [mac, setMac] = useState("40");
  const [year,setYear]= useState("");
  const navigate = useNavigate();

  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    setTimeout(() => {
      processFiles(acceptedFiles);
    }, 5000);
  };

  const handleBrowse = (event) => {
    setLoading(true);
    setTimeout(() => {
      processFiles(event.target.files);
    }, 5000);
  };

  const processFiles = (files) => {
    files.forEach(async (file) => {
      if (
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'text/csv'
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log('File Data:', jsonData);
          setUploadedFiles(prevFiles => [...prevFiles, { name: file.name, data: jsonData, id: uuidv4() }]);
          setLoading(false);
          setIsDragging(false);
          goBack(jsonData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('Invalid file type. Please upload a CSV or XLSX file.');
        setLoading(false);
      }
    });
  };

  const deleteFile = (id) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };
  
  const goBack = async (jsonData) => { 
    try {  
      const response = await axios.post('http://localhost:5000/upload', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Data uploaded successfully:', response.data);  
      navigate('/main/graph');  
    } catch (error) {  
      console.error('Error uploading data:', error);  
    }  
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

 useDropzone({ onDrop: handleBrowse, noClick: true, noKeyboard: true });

  return (
    <div className='upload'>
      <div className={`div1 ${uploadedFiles.length > 0 ? 'small' : 'large'}`}>
        <div className='div2'>
          <h1>Upload</h1>
        </div>
        <div className='drop'
          {...getRootProps()}
          style={{ borderColor: isDragging ? 'blue' : '#cccccc' }}
        >
          <IoCloudUploadOutline className='icon' color='blue' />
          <p><b>Drag & drop files or &nbsp;
            <label className='browse' htmlFor="browseInput"><u>Browse</u></label>
            <input id="browseInput" type="file" {...getInputProps()} />
          </b></p>
          <span>Supported file formats: CSV, Excel</span>
        </div>
        {loading && (
          <div className="loading-indicator">Uploading and processing files...</div>
        )}
        {uploadedFiles.length > 0 && (
          <div className='uplaoded'>
            <h3>Uploaded Files:</h3>
            <ul>
              {uploadedFiles.map((file) => (
                <li key={file.id}>
                  <span>{file.name}</span>
                  <FaTrash color='red' className='trash' onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="OSRatio" style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="assetRatio" className="asset-ratio-label">Asset ratio(Windows:Mac):</label>
          <input id="assetRatiowindows" className="asset-ratio-input" type="text" value={windows} onChange={(e) => { setWindows(e.target.value) }} /> &nbsp;:&nbsp;
          <input id="assetRatiomac" className="asset-ratio-input" type="text" value={mac} onChange={(e) => { setMac(e.target.value) }} />
          <label>Year to predict</label>
          <input type='text' value={year} onChange={(e)=>{setYear(e.target.value)}}/>
        </div>
        <div>
          <button className='uploadButton' onClick={goBack}>Upload Files</button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;