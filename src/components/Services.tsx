import React, { useState, useEffect } from 'react';
import { Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft, ArrowUpRight, AtSign, Award, BarChart, BarChart2, Battery, BatteryCharging, Bell, BellOff, Bluetooth, Bold, Book, Bookmark, Box, Briefcase, Calendar, Camera, CameraOff, Cast, Check, CheckCircle, CheckSquare, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard, Clock, Cloud, CloudDrizzle, CloudLightning, CloudOff, CloudRain, CloudSnow, Code, Codepen, Coffee, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, DollarSign, Download, DownloadCloud, Droplet, Edit, Edit2, Edit3, ExternalLink, Eye, EyeOff, Facebook, FastForward, Feather, File, FileCode, FileText, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Globe, Grid, HardDrive, Hash, Headphones, Heart, HelpCircle, Hexagon, Home, Image, Inbox, Info, Instagram, Italic, Key, Layers, Layout, LayoutGrid, LifeBuoy, Link, Link2, List, Loader, Lock, LogIn, LogOut, Mail, Map, MapPin, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, Minus, MinusCircle, MinusSquare, Monitor, Moon, MoreHorizontal, MoreVertical, Mouse, MousePointer, Move, Music, Navigation, Navigation2, Octagon, Package, Paperclip, Pause, PauseCircle, PenTool, Percent, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, Play, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power, Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search, Send, Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag, ShoppingCart, Shuffle, Sidebar, SkipBack as Skip, Slack, Slash, Sliders, Smartphone, Smile, Speaker, Square, Star, StopCircle, Sun, Sunrise, Sunset, Table, Tablet, Tag, Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, PenTool as Tool, Trash, Trash2, Trello, TrendingDown, TrendingUp, Triangle, Truck, Tv, Twitter, Type, Umbrella, Underline, Unlock, Upload, UploadCloud, User, UserCheck, UserMinus, UserPlus, UserX, Users, Video, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi, WifiOff, Wind, X, XCircle, XOctagon, XSquare, Youtube, Zap, ZapOff, ZoomIn as Zoom, ZoomIn, ZoomOut, PanelLeft, Wrench, Loader2 } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  short_description: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive';
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Activity: <Activity size={36} />,
  Airplay: <Airplay size={36} />,
  AlertCircle: <AlertCircle size={36} />,
  AlertOctagon: <AlertOctagon size={36} />,
  AlertTriangle: <AlertTriangle size={36} />,
  AlignCenter: <AlignCenter size={36} />,
  AlignJustify: <AlignJustify size={36} />,
  AlignLeft: <AlignLeft size={36} />,
  AlignRight: <AlignRight size={36} />,
  Anchor: <Anchor size={36} />,
  Aperture: <Aperture size={36} />,
  Archive: <Archive size={36} />,
  ArrowDown: <ArrowDown size={36} />,
  ArrowDownCircle: <ArrowDownCircle size={36} />,
  ArrowDownLeft: <ArrowDownLeft size={36} />,
  ArrowDownRight: <ArrowDownRight size={36} />,
  ArrowLeft: <ArrowLeft size={36} />,
  ArrowLeftCircle: <ArrowLeftCircle size={36} />,
  ArrowRight: <ArrowRight size={36} />,
  ArrowRightCircle: <ArrowRightCircle size={36} />,
  ArrowUp: <ArrowUp size={36} />,
  ArrowUpCircle: <ArrowUpCircle size={36} />,
  ArrowUpLeft: <ArrowUpLeft size={36} />,
  ArrowUpRight: <ArrowUpRight size={36} />,
  AtSign: <AtSign size={36} />,
  Award: <Award size={36} />,
  BarChart: <BarChart size={36} />,
  BarChart2: <BarChart2 size={36} />,
  Battery: <Battery size={36} />,
  BatteryCharging: <BatteryCharging size={36} />,
  Bell: <Bell size={36} />,
  BellOff: <BellOff size={36} />,
  Bluetooth: <Bluetooth size={36} />,
  Bold: <Bold size={36} />,
  Book: <Book size={36} />,
  Bookmark: <Bookmark size={36} />,
  Box: <Box size={36} />,
  Briefcase: <Briefcase size={36} />,
  Calendar: <Calendar size={36} />,
  Camera: <Camera size={36} />,
  CameraOff: <CameraOff size={36} />,
  Cast: <Cast size={36} />,
  Check: <Check size={36} />,
  CheckCircle: <CheckCircle size={36} />,
  CheckSquare: <CheckSquare size={36} />,
  ChevronDown: <ChevronDown size={36} />,
  ChevronLeft: <ChevronLeft size={36} />,
  ChevronRight: <ChevronRight size={36} />,
  ChevronUp: <ChevronUp size={36} />,
  ChevronsDown: <ChevronsDown size={36} />,
  ChevronsLeft: <ChevronsLeft size={36} />,
  ChevronsRight: <ChevronsRight size={36} />,
  ChevronsUp: <ChevronsUp size={36} />,
  Chrome: <Chrome size={36} />,
  Circle: <Circle size={36} />,
  Clipboard: <Clipboard size={36} />,
  Clock: <Clock size={36} />,
  Cloud: <Cloud size={36} />,
  CloudDrizzle: <CloudDrizzle size={36} />,
  CloudLightning: <CloudLightning size={36} />,
  CloudOff: <CloudOff size={36} />,
  CloudRain: <CloudRain size={36} />,
  CloudSnow: <CloudSnow size={36} />,
  Code: <Code size={36} />,
  Codepen: <Codepen size={36} />,
  Coffee: <Coffee size={36} />,
  Command: <Command size={36} />,
  Compass: <Compass size={36} />,
  Copy: <Copy size={36} />,
  CornerDownLeft: <CornerDownLeft size={36} />,
  CornerDownRight: <CornerDownRight size={36} />,
  CornerLeftDown: <CornerLeftDown size={36} />,
  CornerLeftUp: <CornerLeftUp size={36} />,
  CornerRightDown: <CornerRightDown size={36} />,
  CornerRightUp: <CornerRightUp size={36} />,
  CornerUpLeft: <CornerUpLeft size={36} />,
  CornerUpRight: <CornerUpRight size={36} />,
  Cpu: <Cpu size={36} />,
  CreditCard: <CreditCard size={36} />,
  Crop: <Crop size={36} />,
  Crosshair: <Crosshair size={36} />,
  Database: <Database size={36} />,
  Delete: <Delete size={36} />,
  Disc: <Disc size={36} />,
  DollarSign: <DollarSign size={36} />,
  Download: <Download size={36} />,
  DownloadCloud: <DownloadCloud size={36} />,
  Droplet: <Droplet size={36} />,
  Edit: <Edit size={36} />,
  Edit2: <Edit2 size={36} />,
  Edit3: <Edit3 size={36} />,
  ExternalLink: <ExternalLink size={36} />,
  Eye: <Eye size={36} />,
  EyeOff: <EyeOff size={36} />,
  Facebook: <Facebook size={36} />,
  FastForward: <FastForward size={36} />,
  Feather: <Feather size={36} />,
  File: <File size={36} />,
  FileCode: <FileCode size={36} />,
  FileText: <FileText size={36} />,
  Film: <Film size={36} />,
  Filter: <Filter size={36} />,
  Flag: <Flag size={36} />,
  Folder: <Folder size={36} />,
  FolderMinus: <FolderMinus size={36} />,
  FolderPlus: <FolderPlus size={36} />,
  Framer: <Framer size={36} />,
  Frown: <Frown size={36} />,
  Gift: <Gift size={36} />,
  GitBranch: <GitBranch size={36} />,
  GitCommit: <GitCommit size={36} />,
  GitMerge: <GitMerge size={36} />,
  GitPullRequest: <GitPullRequest size={36} />,
  Globe: <Globe size={36} />,
  Grid: <Grid size={36} />,
  HardDrive: <HardDrive size={36} />,
  Hash: <Hash size={36} />,
  Headphones: <Headphones size={36} />,
  Heart: <Heart size={36} />,
  HelpCircle: <HelpCircle size={36} />,
  Hexagon: <Hexagon size={36} />,
  Home: <Home size={36} />,
  Image: <Image size={36} />,
  Inbox: <Inbox size={36} />,
  Info: <Info size={36} />,
  Instagram: <Instagram size={36} />,
  Italic: <Italic size={36} />,
  Key: <Key size={36} />,
  Layers: <Layers size={36} />,
  Layout: <Layout size={36} />,
  LayoutGrid: <LayoutGrid size={36} />,
  LifeBuoy: <LifeBuoy size={36} />,
  Link: <Link size={36} />,
  Link2: <Link2 size={36} />,
  List: <List size={36} />,
  Loader: <Loader size={36} />,
  Lock: <Lock size={36} />,
  LogIn: <LogIn size={36} />,
  LogOut: <LogOut size={36} />,
  Mail: <Mail size={36} />,
  Map: <Map size={36} />,
  MapPin: <MapPin size={36} />,
  Maximize: <Maximize size={36} />,
  Maximize2: <Maximize2 size={36} />,
  Meh: <Meh size={36} />,
  Menu: <Menu size={36} />,
  MessageCircle: <MessageCircle size={36} />,
  MessageSquare: <MessageSquare size={36} />,
  Mic: <Mic size={36} />,
  MicOff: <MicOff size={36} />,
  Minimize: <Minimize size={36} />,
  Minimize2: <Minimize2 size={36} />,
  Minus: <Minus size={36} />,
  MinusCircle: <MinusCircle size={36} />,
  MinusSquare: <MinusSquare size={36} />,
  Monitor: <Monitor size={36} />,
  Moon: <Moon size={36} />,
  MoreHorizontal: <MoreHorizontal size={36} />,
  MoreVertical: <MoreVertical size={36} />,
  Mouse: <Mouse size={36} />,
  MousePointer: <MousePointer size={36} />,
  Move: <Move size={36} />,
  Music: <Music size={36} />,
  Navigation: <Navigation size={36} />,
  Navigation2: <Navigation2 size={36} />,
  Octagon: <Octagon size={36} />,
  Package: <Package size={36} />,
  Paperclip: <Paperclip size={36} />,
  Pause: <Pause size={36} />,
  PauseCircle: <PauseCircle size={36} />,
  PenTool: <PenTool size={36} />,
  Percent: <Percent size={36} />,
  Phone: <Phone size={36} />,
  PhoneCall: <PhoneCall size={36} />,
  PhoneForwarded: <PhoneForwarded size={36} />,
  PhoneIncoming: <PhoneIncoming size={36} />,
  PhoneMissed: <PhoneMissed size={36} />,
  PhoneOff: <PhoneOff size={36} />,
  PhoneOutgoing: <PhoneOutgoing size={36} />,
  PieChart: <PieChart size={36} />,
  Play: <Play size={36} />,
  PlayCircle: <PlayCircle size={36} />,
  Plus: <Plus size={36} />,
  PlusCircle: <PlusCircle size={36} />,
  PlusSquare: <PlusSquare size={36} />,
  Pocket: <Pocket size={36} />,
  Power: <Power size={36} />,
  Printer: <Printer size={36} />,
  Radio: <Radio size={36} />,
  RefreshCcw: <RefreshCcw size={36} />,
  RefreshCw: <RefreshCw size={36} />,
  Repeat: <Repeat size={36} />,
  Rewind: <Rewind size={36} />,
  RotateCcw: <RotateCcw size={36} />,
  RotateCw: <RotateCw size={36} />,
  Rss: <Rss size={36} />,
  Save: <Save size={36} />,
  Scissors: <Scissors size={36} />,
  Search: <Search size={36} />,
  Send: <Send size={36} />,
  Server: <Server size={36} />,
  Settings: <Settings size={36} />,
  Share: <Share size={36} />,
  Share2: <Share2 size={36} />,
  Shield: <Shield size={36} />,
  ShieldOff: <ShieldOff size={36} />,
  ShoppingBag: <ShoppingBag size={36} />,
  ShoppingCart: <ShoppingCart size={36} />,
  Shuffle: <Shuffle size={36} />,
  Sidebar: <Sidebar size={36} />,
  Skip: <Skip size={36} />,
  Slack: <Slack size={36} />,
  Slash: <Slash size={36} />,
  Sliders: <Sliders size={36} />,
  Smartphone: <Smartphone size={36} />,
  Smile: <Smile size={36} />,
  Speaker: <Speaker size={36} />,
  Square: <Square size={36} />,
  Star: <Star size={36} />,
  StopCircle: <StopCircle size={36} />,
  Sun: <Sun size={36} />,
  Sunrise: <Sunrise size={36} />,
  Sunset: <Sunset size={36} />,
  Table: <Table size={36} />,
  Tablet: <Tablet size={36} />,
  Tag: <Tag size={36} />,
  Target: <Target size={36} />,
  Terminal: <Terminal size={36} />,
  Thermometer: <Thermometer size={36} />,
  ThumbsDown: <ThumbsDown size={36} />,
  ThumbsUp: <ThumbsUp size={36} />,
  ToggleLeft: <ToggleLeft size={36} />,
  ToggleRight: <ToggleRight size={36} />,
  Tool: <Tool size={36} />,
  Trash: <Trash size={36} />,
  Trash2: <Trash2 size={36} />,
  Trello: <Trello size={36} />,
  TrendingDown: <TrendingDown size={36} />,
  TrendingUp: <TrendingUp size={36} />,
  Triangle: <Triangle size={36} />,
  Truck: <Truck size={36} />,
  Tv: <Tv size={36} />,
  Twitter: <Twitter size={36} />,
  Type: <Type size={36} />,
  Umbrella: <Umbrella size={36} />,
  Underline: <Underline size={36} />,
  Unlock: <Unlock size={36} />,
  Upload: <Upload size={36} />,
  UploadCloud: <UploadCloud size={36} />,
  User: <User size={36} />,
  UserCheck: <UserCheck size={36} />,
  UserMinus: <UserMinus size={36} />,
  UserPlus: <UserPlus size={36} />,
  UserX: <UserX size={36} />,
  Users: <Users size={36} />,
  Video: <Video size={36} />,
  VideoOff: <VideoOff size={36} />,
  Voicemail: <Voicemail size={36} />,
  Volume: <Volume size={36} />,
  Volume1: <Volume1 size={36} />,
  Volume2: <Volume2 size={36} />,
  VolumeX: <VolumeX size={36} />,
  Watch: <Watch size={36} />,
  Wifi: <Wifi size={36} />,
  WifiOff: <WifiOff size={36} />,
  Wind: <Wind size={36} />,
  X: <X size={36} />,
  XCircle: <XCircle size={36} />,
  XOctagon: <XOctagon size={36} />,
  XSquare: <XSquare size={36} />,
  Youtube: <Youtube size={36} />,
  Zap: <Zap size={36} />,
  ZapOff: <ZapOff size={36} />,
  Zoom: <Zoom size={36} />,
  ZoomIn: <ZoomIn size={36} />,
  ZoomOut: <ZoomOut size={36} />,
  PanelLeft: <PanelLeft size={36} />,
  Wrench: <Wrench size={36} />,
  Loader2: <Loader2 size={36} />
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-teal-500">
      <div className="text-teal-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/service/all');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        const activeServices = data.services.filter((service: Service) => service.status === 'active');
        setServices(activeServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        // Load fallback services if API fails
        setServices([
          {
            id: 1,
            title: 'Website-uri Corporative',
            short_description: 'Site-uri profesionale pentru afacerea ta, cu design personalizat și funcționalități avansate.',
            description: 'Creăm website-uri corporative profesionale care reflectă identitatea brandului tău și oferă o experiență excelentă utilizatorilor.',
            icon: 'Globe',
            status: 'active'
          },
          {
            id: 2,
            title: 'E-commerce',
            short_description: 'Magazine online complete folosind Magento, Shopify, WooCommerce sau soluții personalizate.',
            description: 'Dezvoltăm soluții e-commerce complete care te ajută să vinzi online eficient și să-ți scalezi afacerea.',
            icon: 'ShoppingCart',
            status: 'active'
          },
          {
            id: 3,
            title: 'Aplicații Web Complexe',
            short_description: 'Aplicații web complexe, în funcție de nevoile tale specifice.',
            description: 'Dezvoltăm aplicații web personalizate care automatizează procesele și cresc eficiența afacerii tale.',
            icon: 'PanelLeft',
            status: 'active'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (error) {
    console.error('Error loading services:', error);
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-500 font-medium">SERVICII</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Ce Putem Face Pentru Tine</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Oferim o gamă completă de servicii digitale pentru a transforma viziunea ta într-o prezență online de succes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={iconMap[service.icon] || <Settings size={36} />}
              title={service.title}
              description={service.short_description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;