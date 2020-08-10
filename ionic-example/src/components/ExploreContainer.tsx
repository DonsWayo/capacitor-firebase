import React from 'react';
import './ExploreContainer.css';
import AnalyticsContainer from './AnalyticsContainer';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  if(name === 'Analytics') {
    return (
      <AnalyticsContainer/>
    );
  } else {
    return (
      <div className="container">
        <strong>{name}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    );
  }
  
};

export default ExploreContainer;
