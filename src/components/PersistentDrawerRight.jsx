import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Home from './Home';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    marginTop: 128, // Account for the two AppBars
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: open ? 0 : -drawerWidth, // Shift the margin dynamically based on drawer state
    width: `calc(100% - ${open ? drawerWidth : 0}px)`, // Dynamically adjust width
    height: `calc(100vh - 128px)`, // Fixed height to fit below AppBars
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function MapWithDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* AppBar 1 */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Fixed AppBar 1
          </Typography>
        </Toolbar>
      </AppBar>

      {/* AppBar 2 */}
      <AppBar position="fixed" sx={{ top: 64, zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Fixed AppBar 2
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content with Map */}
      <Main open={open}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '100%', width: '100%' }} // Map fills available space
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
        </MapContainer>
      </Main>

      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          top: "300px",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Home />
      </Drawer>
    </Box>
  );
}
