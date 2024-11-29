import React, { useState, useEffect } from 'react';
import { ddToDMS, dmsToDD, ddToUTM, utmToDD, ddToMGRS, mgrsToDD } from './coordinateConversion';

function Home() {
  const [ddLat, setDdLat] = useState('');
  const [ddLon, setDdLon] = useState('');
  const [dmsLatDeg, setDmsLatDeg] = useState('');
  const [dmsLatMin, setDmsLatMin] = useState('');
  const [dmsLatSec, setDmsLatSec] = useState('');
  const [dmsLatDir, setDmsLatDir] = useState('N');
  const [dmsLonDeg, setDmsLonDeg] = useState('');
  const [dmsLonMin, setDmsLonMin] = useState('');
  const [dmsLonSec, setDmsLonSec] = useState('');
  const [dmsLonDir, setDmsLonDir] = useState('E');
  const [utmNorthing, setUtmNorthing] = useState('');
  const [utmEasting, setUtmEasting] = useState('');
  const [utmZone, setUtmZone] = useState('');
  const [mgrs, setMgrs] = useState('');

  const fetchGPSLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDdLat(position.coords.latitude.toFixed(6));
        setDdLon(position.coords.longitude.toFixed(6));
      },
      (error) => {
        console.error('Error fetching GPS location:', error);
      }
    );
  };

  useEffect(() => {
    if (ddLat && ddLon) {
      const latDMS = ddToDMS(ddLat);
      const lonDMS = ddToDMS(ddLon);
      setDmsLatDeg(latDMS[0]);
      setDmsLatMin(latDMS[1]);
      setDmsLatSec(latDMS[2]);
      setDmsLatDir(latDMS[3]);
      setDmsLonDeg(lonDMS[0]);
      setDmsLonMin(lonDMS[1]);
      setDmsLonSec(lonDMS[2]);
      setDmsLonDir(lonDMS[3]);
      const utm = ddToUTM(ddLat, ddLon);
      setUtmNorthing(utm.x);
      setUtmEasting(utm.y);
      setUtmZone(utm.zone);
      setMgrs(ddToMGRS(ddLat, ddLon));
    }
  }, [ddLat, ddLon]);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Coordinate Converter</h1>

      {/* GPS Button */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={fetchGPSLocation}>Take from GPS</button>
      </div>

      <div style={flexContainerStyle}>
        {/* Decimal Degrees (DD) Section */}
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>Decimal Degrees</h3>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Latitude</label>
            <input
              type="number"
              value={ddLat}
              onChange={(e) => setDdLat(e.target.value)}
              placeholder="Latitude"
              style={inputStyle}
            />
            <label style={labelStyle}>Longitude</label>
            <input
              type="number"
              value={ddLon}
              onChange={(e) => setDdLon(e.target.value)}
              placeholder="Longitude"
              style={inputStyle}
            />
          </div>
        </div>

        {/* DMS Section */}
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>Degrees, Minutes, Seconds (DMS)</h3>
          <div style={dmsTableContainerStyle}>
            <table style={tableStyle}>
              <tbody>
                {/* Latitude DMS */}
                <tr>
                  <td style={tableCellStyle}>Latitude</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Degree"
                      value={dmsLatDeg}
                      onChange={(e) => setDmsLatDeg(e.target.value)}
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Minute"
                      value={dmsLatMin}
                      onChange={(e) => setDmsLatMin(e.target.value)}
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Second"
                      value={dmsLatSec}
                      onChange={(e) => setDmsLatSec(e.target.value)}
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <select
                      value={dmsLatDir}
                      onChange={(e) => setDmsLatDir(e.target.value)}
                      style={directionSelectStyle}
                    >
                      <option value="N">N</option>
                      <option value="S">S</option>
                    </select>
                  </td>
                </tr>

                {/* Longitude DMS */}
                <tr>
                  <td style={tableCellStyle}>Longitude</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Degree"
                      value={dmsLonDeg}
                      onChange={(e) => setDmsLonDeg(e.target.value)}
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Minute"
                      value={dmsLonMin}
                      onChange={(e) => setDmsLonMin(e.target.value)}
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Second"
                      value={dmsLonSec}
                      onChange={(e) => setDmsLonSec(e.target.value)}
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <select
                      value={dmsLonDir}
                      onChange={(e) => setDmsLonDir(e.target.value)}
                      style={directionSelectStyle}
                    >
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UTM and MGRS Section */}
      <div style={flexContainerStyle}>
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>UTM</h3>
          <div style={inputWrapperStyle}>
            <input
              type="number"
              value={utmNorthing}
              onChange={(e) => setUtmNorthing(e.target.value)}
              placeholder="Northing"
              style={inputStyle}
            />
            <input
              type="number"
              value={utmEasting}
              onChange={(e) => setUtmEasting(e.target.value)}
              placeholder="Easting"
              style={inputStyle}
            />
            <input
              type="text"
              value={utmZone}
              onChange={(e) => setUtmZone(e.target.value)}
              placeholder="Zone"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>MGRS</h3>
          <div style={inputWrapperStyle}>
            <input
              type="text"
              value={mgrs}
              onChange={(e) => setMgrs(e.target.value)}
              placeholder="MGRS"
              style={inputStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Styling
const containerStyle = {
  padding: '30px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f7fb',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '2em',
  color: '#333',
  marginBottom: '20px',
};

const buttonContainerStyle = {
  marginBottom: '20px',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.2em',
  transition: 'background 0.3s',
};

const flexContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

const inputCardStyle = {
  flex: '1',
  minWidth: '300px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #ddd',
};

const sectionHeadingStyle = {
  fontSize: '1.25em',
  fontWeight: 'bold',
  color: '#444',
  marginBottom: '15px',
};

const inputWrapperStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#555',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const dmsTableContainerStyle = {
  marginTop: '20px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px',
};

const tableCellStyle = {
  padding: '8px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

const dmsInputStyle = {
  width: '80px',
  padding: '8px',
  margin: '5px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const directionSelectStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  backgroundColor: '#f4f7fb',
};
export default Home;