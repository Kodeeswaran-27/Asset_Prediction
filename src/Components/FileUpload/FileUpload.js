import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { IoCloudUploadOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import './FileUpload.css'; // Import the CSS file

const FileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    setTimeout(() => {
      processFiles(acceptedFiles);
    }, 5000); // Display the loading message for 5 seconds
  };

  const handleBrowse = (event) => {
    setLoading(true);
    setTimeout(() => {
      processFiles(event.target.files);
    }, 5000); // Display the loading message for 5 seconds
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
        };
        reader.readAsArrayBuffer(file);
      } else {
        console.error('Invalid file type. Please upload a CSV or XLSX file.');
        setLoading(false);
      }
    });
  };

  const deleteFile = (id) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const clearFiles = () => {
    setUploadedFiles([]);
  };

  const displayFileData = () => {
    uploadedFiles.forEach((file) => {
      console.log('File Name:', file.name);
      console.log('File Data:', file.data);
    });
  };

  const { getRootProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const { getInputProps: getBrowseInputProps } = useDropzone({ onDrop: handleBrowse, noClick: true, noKeyboard: true });

  return (
    <div className='upload'>
      <div className='div1'>
        <div className='div2'>
          <h1>Upload</h1>
        </div>
        <div className='drop'
          {...getRootProps()}
          style={{ borderColor: isDragging ? 'blue' : '#cccccc' }}
        >
          <IoCloudUploadOutline className='icon' color='blue'/>
          <p><b>Drag & drop files or &nbsp;
            <label className='browse' htmlFor="browseInput"><u>Browse</u></label>
            <input id="browseInput" type="file" {...getBrowseInputProps()} />
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
                  <FaTrash color='red'className='trash' onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={displayFileData}>Upload Files</button>
        {/* <button onClick={clearFiles}>Clear Files</button> */}
      </div>
    </div>
  );
};

export default FileUpload;
