import React from 'react';
import * as MuiIcons from '@mui/icons-material';

// Create a map of all MUI icons
const muiIconMap: { [key: string]: React.ReactNode } = {};

// Dynamically add all icons from MUI
Object.keys(MuiIcons).forEach(iconName => {
  const IconComponent = (MuiIcons as any)[iconName];
  if (typeof IconComponent === 'function') {
    muiIconMap[iconName] = <IconComponent />;
  }
});

export { muiIconMap };