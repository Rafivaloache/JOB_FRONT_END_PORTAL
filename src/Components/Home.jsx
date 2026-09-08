import React from 'react';
import Banner from './Banner';
import TotalCounts from './TotalCounts';
import BrowsebyCategory from './Category/BrowsebyCategory';
import FeatureJob from './Feature-jobs/FeatureJob';

const Home = () => {
    return (
        <div className='container bg-black mx-auto p-4'>
            <Banner/>
            <TotalCounts/>
            <BrowsebyCategory/>
            <FeatureJob/>
            
        </div>
    );
};

export default Home;