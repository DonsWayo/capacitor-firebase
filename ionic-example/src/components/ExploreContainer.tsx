import React from 'react';
import AnalyticsContainer from './AnalyticsContainer';
import StorageContainer from './StorageContainer';
import FirestoreContainer from './FirestoreContainer';
import CrashlyticsContainer from './CrashlyticsContainer';
import AuthContainer from './AuthContainer';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  console.log(name)
  if(name === 'Analytics') {
    return (
      <AnalyticsContainer/>
    );
  } 
  if(name === 'Firestore') {
    return (
      <FirestoreContainer/>
    );
  } 
  if(name === 'Storage') {
    return (
      <StorageContainer/>
    );
  }
  if(name === 'Crashlytics') {
    return (
      <CrashlyticsContainer/>
    );
  }
  if(name === 'Auth') {
    return (
      <AuthContainer/>
    );
  }
  else {
    return (
      <div className="container">
        <strong>{name}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    );
  }
  
};

export default ExploreContainer;
