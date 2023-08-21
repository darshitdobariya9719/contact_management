import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useQuery } from 'react-query';
import axios from 'axios';
const containerStyle = {
  width: '100%',
  height: '400px',
};

interface Country {
    todayRecovered: number;
    todayCases: number;
    country: string;
    cases: number;
    deaths: number;
    countryInfo: {
      lat: number;
      long: number;
    };
  }
const center = {
  lat: 33,
  lng: 65,
};
const MapComponent: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<Country | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery<Country[]>('countryCases', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    return response.data;
  });
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="map-container h-96 md:h-500px w-full">
    <LoadScript googleMapsApiKey="AIzaSyA5XIRlzPvqaYj95wpWtkulODUC_0Bitt8">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {data.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.countryInfo.lat, lng: marker.countryInfo.long }} onClick={() => setSelectedMarker(marker)} />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.countryInfo.lat, lng: selectedMarker.countryInfo.long }}
            onCloseClick={() => setSelectedMarker(null)}
          >
           <div className="w-full md:w-1/2 lg:w-full max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-4">
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Cases:</span>
                  {selectedMarker.cases}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Today Cases:</span>
                  {selectedMarker.todayCases}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Today Recovered:</span>
                  {selectedMarker.todayRecovered}
                </p>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default MapComponent;
