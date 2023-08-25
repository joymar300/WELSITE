import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './slidercolombia.css';
import { GrFormPreviousLink } from 'react-icons/gr';

const DepartmentSlider = () => {
  const [departments, setDepartments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api-colombia.com/api/v1/TouristicAttraction'
        );
        setDepartments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % departments.length);
    setIsLoading(true); // Set isLoading to true when changing slide
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? departments.length - 1 : prevIndex - 1
    );
    setIsLoading(true); // Set isLoading to true when changing slide
  };

  return (
    <div className="department-slider">
      {departments.length > 0 ? (
        <div className="slider-content">
          <div className="image-container">
            <button className="prev-button" onClick={prevSlide}>
              <GrFormPreviousLink className='btnpv' />
            </button>
            <img
              className={`image-fade ${isLoading ? 'loading' : ''}`}
              src={departments[currentIndex].images}
              alt=""
              width={400}
              height={400}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div className="text-container">
            <h2>{departments[currentIndex].name}</h2>
            <p>Description: {departments[currentIndex].description}</p>
          </div>
          <div className="slider-buttons">
            <button className="next-button" onClick={nextSlide}>Next</button>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DepartmentSlider;
