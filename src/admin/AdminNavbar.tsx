import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    Dashboard,
    Description,
    Image,
    Message,
    Menu as MenuIcon,
    Close,
    ExpandMore,
    People,
    Settings,
    Notifications,
    Help
} from '@mui/icons-material';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse, AppBar, Toolbar, Typography } from '@mui/material';

const AdminNavbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);
    const location = useLocation();

    const menuItems = [
        {
            id: 'dashboard',
            path: '/admin',
            icon: <Dashboard />,
            label: 'Dashboard'
        },
        {
            id: 'content',
            label: 'Conținut',
            icon: <Description />,
            submenu: [
                { path: '/admin/services', label: 'Servicii' },
                { path: '/admin/portfolio', label: 'Portofoliu' },
                { path: '/admin/testimonials', label: 'Testimoniale' }
            ]
        },
        {
            id: 'users',
            label: 'Utilizatori',
            icon: <People />,
            submenu: [
                { path: '/admin/users', label: 'Toți Utilizatorii' },
                { path: '/admin/roles', label: 'Roluri' }
            ]
        },
        {
            id: 'settings',
            label: 'Setări',
            icon: <Settings />,
            submenu: [
                { path: '/admin/general', label: 'General' },
                { path: '/admin/appearance', label: 'Aspect' },
                { path: '/admin/security', label: 'Securitate' }
            ]
        }
    ];

    const toggleMenu = (menuId: string) => {
        setExpandedMenus(prev => 
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

    const isActivePath = (path: string) => location.pathname === path;

    const isActiveMenu = (item: any) => {
        if (item.path) {
            return isActivePath(item.path);
        }
        if (item.submenu) {
            return item.submenu.some((subItem: any) => isActivePath(subItem.path));
        }
        return false;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Drawer
                variant="permanent"
                open={isSidebarOpen}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#1e293b',
                        color: 'white'
                    },
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="h6" component="div">
                        Webarca Admin
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => setIsSidebarOpen(false)}
                        sx={{ display: { lg: 'none' } }}
                    >
                        <Close />
                    </IconButton>
                </Toolbar>

                <List>
                    {menuItems.map((item) => (
                        <React.Fragment key={item.id}>
                            {item.submenu ? (
                                <>
                                    <ListItemButton
                                        onClick={() => toggleMenu(item.id)}
                                        selected={isActiveMenu(item)}
                                        sx={{
                                            '&.Mui-selected': {
                                                backgroundColor: '#0CB4AA',
                                                '&:hover': {
                                                    backgroundColor: '#0a8f87'
                                                }
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                        <ExpandMore
                                            sx={{
                                                transform: isMenuExpanded(item.id) ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: '0.2s'
                                            }}
                                        />
                                    </ListItemButton>
                                    <Collapse in={isMenuExpanded(item.id)} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.submenu.map((subItem) => (
                                                <ListItemButton
                                                    key={subItem.path}
                                                    component={Link}
                                                    to={subItem.path}
                                                    selected={isActivePath(subItem.path)}
                                                    sx={{
                                                        pl: 4,
                                                        '&.Mui-selected': {
                                                            backgroundColor: '#0CB4AA',
                                                            '&:hover': {
                                                                backgroundColor: '#0a8f87'
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <ListItemText primary={subItem.label} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                            ) : (
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={isActivePath(item.path)}
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: '#0CB4AA',
                                            '&:hover': {
                                                backgroundColor: '#0a8f87'
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            <div className={`${isSidebarOpen ? 'lg:ml-60' : ''}`}>
                <AppBar position="static" color="default" elevation={1}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            sx={{ mr: 2, display: { lg: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {menuItems.find(item => isActiveMenu(item))?.label || 'Dashboard'}
                        </Typography>
                        <IconButton color="inherit">
                            <Notifications />
                        </IconButton>
                        <IconButton color="inherit">
                            <Help />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminNavbar;