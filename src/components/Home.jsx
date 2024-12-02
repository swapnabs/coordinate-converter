import React, { useState, useEffect } from 'react';
import { ddToDMS, dmsToDD, ddToUTM, utmToDD, ddToMGRS, mgrsToDD,dmToDD, ddToDM } from './coordinateConversion';

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
  const [dmLatDeg, setDmLatDeg] = useState('');
  const [dmLatMin, setDmLatMin] = useState('');
  const [dmLatDir, setDmLatDir] = useState('N');
  const [dmLonDeg, setDmLonDeg] = useState('');
  const [dmLonMin, setDmLonMin] = useState('');
  const [dmLonDir, setDmLonDir] = useState('E');


  const updateFromDM = () => {
    const latDD = dmToDD(parseFloat(dmLatDeg), parseFloat(dmLatMin), dmLatDir);
    const lonDD = dmToDD(parseFloat(dmLonDeg), parseFloat(dmLonMin), dmLonDir);

    if (isNaN(latDD) || isNaN(lonDD)) {
        console.error("Invalid input values for Degrees and Minutes.");
        return;
    }

    setDdLat(latDD);
    setDdLon(lonDD);
    updateFromDD();
};


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

  const updateFromDD = () => {
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
      const latDM = ddToDM(ddLat,'N');
      const lonDM = ddToDM(ddLon,'N');
      setDmLatDeg(latDM[0])
      setDmLatMin(latDM[1])
      setDmLatDir(latDM[2])
      setDmLonDeg(lonDM[0])
      setDmLonMin(lonDM[1])
      setDmLonDir(lonDM[2])
      const utm = ddToUTM(ddLat, ddLon);
      setUtmNorthing(utm.x);
      setUtmEasting(utm.y);
      setUtmZone(utm.zone);
      setMgrs(ddToMGRS(ddLat, ddLon));
    }
  };

  const updateFromDMS = () => {
    const latDD = dmsToDD(dmsLatDeg, dmsLatMin, dmsLatSec, dmsLatDir);
    const lonDD = dmsToDD(dmsLonDeg, dmsLonMin, dmsLonSec, dmsLonDir);
    setDdLat(latDD);
    setDdLon(lonDD);
    const utm = ddToUTM(latDD, lonDD);
    setUtmNorthing(utm.x);
    setUtmEasting(utm.y);
    setUtmZone(utm.zone);
    setMgrs(ddToMGRS(latDD, lonDD));
  };

  const updateFromUTM = () => {
    const dd = utmToDD(utmEasting, utmNorthing, utmZone);
    setDdLat(dd.lat);
    setDdLon(dd.lon);
    updateFromDD();
  };

  const updateFromMGRS = () => {
    const dd = mgrsToDD(mgrs);
    setDdLat(dd.lat);
    setDdLon(dd.lon);
    updateFromDD();
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Coordinate Converter</h1>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={fetchGPSLocation}>Take from GPS</button>
      </div>

      <div style={flexContainerStyle}>
        {/* Decimal Degrees (DD) */}
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
          <button style={buttonStyle} onClick={updateFromDD}>Update</button>
        </div>

        {/* Degrees, Minutes, Seconds (DMS) */}
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>Degrees, Minutes, Seconds (DMS)</h3>
          <div style={dmsTableContainerStyle}>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tableCellStyle}>Latitude</td>
                  <td><input type="number" value={dmsLatDeg} onChange={(e) => setDmsLatDeg(e.target.value)} placeholder="Deg" style={dmsInputStyle} /></td>
                  <td><input type="number" value={dmsLatMin} onChange={(e) => setDmsLatMin(e.target.value)} placeholder="Min" style={dmsInputStyle} /></td>
                  <td><input type="number" value={dmsLatSec} onChange={(e) => setDmsLatSec(e.target.value)} placeholder="Sec" style={dmsInputStyle} /></td>
                  <td>
                    <select value={dmsLatDir} onChange={(e) => setDmsLatDir(e.target.value)} style={directionSelectStyle}>
                      <option value="N">N</option>
                      <option value="S">S</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={tableCellStyle}>Longitude</td>
                  <td><input type="number" value={dmsLonDeg} onChange={(e) => setDmsLonDeg(e.target.value)} placeholder="Deg" style={dmsInputStyle} /></td>
                  <td><input type="number" value={dmsLonMin} onChange={(e) => setDmsLonMin(e.target.value)} placeholder="Min" style={dmsInputStyle} /></td>
                  <td><input type="number" value={dmsLonSec} onChange={(e) => setDmsLonSec(e.target.value)} placeholder="Sec" style={dmsInputStyle} /></td>
                  <td>
                    <select value={dmsLonDir} onChange={(e) => setDmsLonDir(e.target.value)} style={directionSelectStyle}>
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button style={buttonStyle} onClick={updateFromDMS}>Update</button>
        </div>

        {/* DM format */}
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>Degrees and Minutes (DM)</h3>
          <div style={dmsTableContainerStyle}>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tableCellStyle}>Latitude</td>
                  <td>
                    <input
                      type="number"
                      value={dmLatDeg}
                      onChange={(e) => setDmLatDeg(e.target.value)}
                      placeholder="Deg"
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dmLatMin}
                      onChange={(e) => setDmLatMin(e.target.value)}
                      placeholder="Min"
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <select
                      value={dmLatDir}
                      onChange={(e) => setDmLatDir(e.target.value)}
                      style={directionSelectStyle}
                    >
                      <option value="N">N</option>
                      <option value="S">S</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={tableCellStyle}>Longitude</td>
                  <td>
                    <input
                      type="number"
                      value={dmLonDeg}
                      onChange={(e) => setDmLonDeg(e.target.value)}
                      placeholder="Deg"
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dmLonMin}
                      onChange={(e) => setDmLonMin(e.target.value)}
                      placeholder="Min"
                      style={dmsInputStyle}
                    />
                  </td>
                  <td>
                    <select
                      value={dmLonDir}
                      onChange={(e) => setDmLonDir(e.target.value)}
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
          <button style={buttonStyle} onClick={updateFromDM}>Update</button>
        </div>

        {/* UTM */}
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>UTM</h3>
          <div style={inputWrapperStyle}>
            <input type="number" value={utmNorthing} onChange={(e) => setUtmNorthing(e.target.value)} placeholder="Northing" style={inputStyle} />
            <input type="number" value={utmEasting} onChange={(e) => setUtmEasting(e.target.value)} placeholder="Easting" style={inputStyle} />
            <input type="text" value={utmZone} onChange={(e) => setUtmZone(e.target.value)} placeholder="Zone" style={inputStyle} />
          </div>
          <button style={buttonStyle} onClick={updateFromUTM}>Update</button>
        </div>

        {/* MGRS */}
        <div style={inputCardStyle}>
          <h3 style={sectionHeadingStyle}>MGRS</h3>
          <div style={inputWrapperStyle}>
            <input type="text" value={mgrs} onChange={(e) => setMgrs(e.target.value)} placeholder="MGRS" style={inputStyle} />
          </div>
          <button style={buttonStyle} onClick={updateFromMGRS}>Update</button>
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