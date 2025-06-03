import React from 'react';
import { Users, FileText, Image, MessageSquare } from 'lucide-react';
import {useAuth} from "../context/AuthContext.tsx";

const AdminDashboard: React.FC = () => {
    const stats = [
        { title: 'Servicii Active', value: '8', icon: <FileText size={24} />, color: 'bg-blue-500' },
        { title: 'Proiecte în Portofoliu', value: '24', icon: <Image size={24} />, color: 'bg-green-500' },
        { title: 'Testimoniale', value: '12', icon: <MessageSquare size={24} />, color: 'bg-purple-500' },
        { title: 'Clienți Activi', value: '45', icon: <Users size={24} />, color: 'bg-yellow-500' },
    ];
    const { user } = useAuth();

    console.log(user);
    return (
        <main>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center">
                                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                    {stat.icon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Activitate Recentă</h2>
                        <div className="space-y-4">
                            {[
                                { action: 'Serviciu nou adăugat', time: 'Acum 2 ore' },
                                { action: 'Proiect actualizat', time: 'Acum 4 ore' },
                                { action: 'Testimonial nou', time: 'Acum 1 zi' },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b">
                                    <span className="text-gray-600">{activity.action}</span>
                                    <span className="text-sm text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Notificări</h2>
                        <div className="space-y-4">
                            {[
                                { message: 'Cerere nouă de contact', type: 'info' },
                                { message: 'Backup automat realizat cu succes', type: 'success' },
                                { message: 'Actualizare sistem disponibilă', type: 'warning' },
                            ].map((notification, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b">
                                    <span className="text-gray-600">{notification.message}</span>
                                    <span className={`text-sm px-2 py-1 rounded ${
                                        notification.type === 'info' ? 'bg-blue-100 text-blue-800' :
                                            notification.type === 'success' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'
                                    }`}>
                      {notification.type}
                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
