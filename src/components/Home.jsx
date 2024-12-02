import React, { useState, useEffect } from 'react';
import { ddToDMS, dmsToDD, ddToUTM, utmToDD, ddToMGRS, mgrsToDD, dmToDD, ddToDM } from './coordinateConversion';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { CalculateOutlined, GpsFixedTwoTone } from '@mui/icons-material';

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
      const latDM = ddToDM(ddLat, 'N');
      const lonDM = ddToDM(ddLon, 'N');
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

  // Styling
const containerStyle = {
  padding: '30px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f7fb',
  textAlign: 'center',
};

  return (
    <>
      <Grid container sx={containerStyle}>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        <Grid item xs={12}>
          <Button fullWidth sx={{ color: "black", border: "1px solid black" }} variant='outlined' onClick={fetchGPSLocation}><GpsFixedTwoTone /> My Current Location</Button>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        {/* ==========================================DD================================================= */}
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <Typography sx={{ fontWeight: 'bold' }}>Decimal Degrees (DD)</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          N {ddLat} E {ddLon}
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <div className="input-container">
            <span className="input-label">lat:</span>
            <input className="input-field" type="number" value={ddLat} onChange={(e) => setDdLat(e.target.value)} />
            <span class="input-suffix">&deg; N</span>
          </div>
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <div className="input-container">
            <span className="input-label">lng:</span>
            <input className="input-field" type="number" value={ddLon} onChange={(e) => setDdLon(e.target.value)} />
            <span class="input-suffix">&deg; E</span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' onClick={updateFromDD} sx={{ bgcolor: "#ffc107", color: "black" }}><CalculateOutlined /></Button>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        {/* =====================================================DM================================================================ */}
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <Typography sx={{ fontWeight: 'bold' }}>Degrees Minutes (DM)</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          N {dmLatDeg}&deg;{dmLatMin} E {dmLonDeg}&deg;{dmLonMin}
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <div className="input-container">
            <span className="input-label">lat:</span>
            <input className="input-field-small" type="number" value={dmLatDeg} onChange={(e) => setDmLatDeg(e.target.value)} />
            <span class="input-suffix">&deg;</span>
            <input className="input-field" type="number" value={dmLatMin} onChange={(e) => setDmLatMin(e.target.value)} />
            <span class="input-suffix">' N</span>
          </div>
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <div className="input-container">
            <span className="input-label">lon:</span>
            <input className="input-field-small" type="number" value={dmLonDeg} onChange={(e) => setDmLonDeg(e.target.value)} />
            <span class="input-suffix">&deg;</span>
            <input className="input-field" type="number" value={dmLonMin} onChange={(e) => setDmLonMin(e.target.value)} />
            <span class="input-suffix">' E</span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' onClick={updateFromDM} sx={{ bgcolor: "#ffc107", color: "black" }}><CalculateOutlined /></Button>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        {/* ======================================DMS=============================== */}

        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <Typography sx={{ fontWeight: 'bold' }}>Degrees and Minutes (DM)</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          N {dmLatDeg}&deg;{dmsLatMin}'{dmsLatSec}" E {dmsLonDeg}&deg;{dmsLonMin}'{dmsLonSec}"
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <div className="input-container">
            <span className="input-label">lat:</span>
            <input className="input-field-small" type="number" value={dmsLatDeg} onChange={(e) => setDmsLatDeg(e.target.value)} />
            <span class="input-suffix">&deg;</span>
            <input className="input-field-small" type="number" value={dmsLatMin} onChange={(e) => setDmsLatMin(e.target.value)} />
            <span class="input-suffix">'</span>
            <input className="input-field" type="number" value={dmsLatSec} onChange={(e) => setDmsLatSec(e.target.value)} />
            <span class="input-suffix">" N</span>
          </div>
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <div className="input-container">
            <span className="input-label">lon:</span>
            <input className="input-field-small" type="number" value={dmsLonDeg} onChange={(e) => setDmsLonDeg(e.target.value)} />
            <span class="input-suffix">&deg;</span>
            <input className="input-field-small" type="number" value={dmsLonMin} onChange={(e) => setDmsLonMin(e.target.value)} />
            <span class="input-suffix">'</span>
            <input className="input-field" type="number" value={dmsLonSec} onChange={(e) => setDmsLonSec(e.target.value)} />
            <span class="input-suffix">" N</span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' onClick={updateFromDMS} sx={{ bgcolor: "#ffc107", color: "black" }}><CalculateOutlined /></Button>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        {/* ===============================UTM==================================== */}
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <Typography sx={{ fontWeight: 'bold' }}>Universal Transverse Mercator (UTM)</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          {utmZone} {utmEasting} {utmNorthing}
        </Grid>
        <Grid item xs={2}>
          <div className="input-container">
            <span className="input-label">Z:</span>
            <input className="input-field" onChange={(e) => setUtmZone(e.target.value)} value={utmZone} type="text" />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-container">
            <span className="input-label">E:</span>
            <input className="input-field" onChange={(e) => setUtmEasting(e.target.value)} value={utmEasting} type="number" />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-container">
            <span className="input-label">N:</span>
            <input className="input-field" onChange={(e) => setUtmNorthing(e.target.value)} value={utmNorthing} type="number" />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' onClick={updateFromUTM} sx={{ bgcolor: "#ffc107", color: "black" }}><CalculateOutlined /></Button>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        {/* =======================================MGRS==================================== */}
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          <Typography sx={{ fontWeight: 'bold' }}>Military Grid Reference System (MGRS)</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}>
          {mgrs}
        </Grid>
        <Grid item xs={10}>
          <div className="input-container">
          <span className="input-label">MGRS:</span>
            <input className="input-field" fullWidth onChange={(e) => setMgrs(e.target.value)} value={mgrs} />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' sx={{ bgcolor: "#ffc107", color: "black" }} onClick={updateFromMGRS}><CalculateOutlined /></Button>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2 }} />
      </Grid>
    </>
  );
}




export default Home;