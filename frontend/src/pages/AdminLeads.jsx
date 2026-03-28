import React, { useState, useEffect } from 'react';
import { callbackAPI } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, Calendar, User, Building2, MapPin } from 'lucide-react';

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await callbackAPI.getAll();
                setLeads(res.data);
            } catch (error) {
                console.error('Error fetching leads:', error);
                toast({
                    title: "Error",
                    description: "Failed to load leads from the server.",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2C3E95]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Leads Dashboard</h1>
                        <p className="text-gray-600">Track and manage "Express Interest" inquiries</p>
                    </div>
                    <Badge variant="outline" className="text-sm px-4 py-1">
                        Total leads: {leads.length}
                    </Badge>
                </div>

                <Card className="shadow-xl border-none">
                    <CardContent className="p-0 overflow-hidden rounded-xl">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="font-bold">Date</TableHead>
                                        <TableHead className="font-bold">Contact Info</TableHead>
                                        <TableHead className="font-bold">Company</TableHead>
                                        <TableHead className="font-bold">Distributor Interested In</TableHead>
                                        <TableHead className="font-bold">Location</TableHead>
                                        <TableHead className="font-bold">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leads.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                                No leads found. Interests expressed will appear here.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        leads.map((lead) => (
                                            <TableRow key={lead.id} className="hover:bg-gray-50 transition-colors">
                                                <TableCell className="whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm">
                                                            {new Date(lead.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="font-bold flex items-center gap-2">
                                                            <User className="w-4 h-4 text-[#2C3E95]" />
                                                            {lead.full_name}
                                                        </div>
                                                        <div className="text-xs text-gray-600 flex items-center gap-2">
                                                            <Mail className="w-3 h-3" /> {lead.email}
                                                        </div>
                                                        <div className="text-xs text-gray-600 flex items-center gap-2">
                                                            <Phone className="w-3 h-3" /> {lead.phone}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-gray-400" />
                                                        <span>{lead.company_name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100">
                                                        {lead.product}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        {lead.city} ({lead.pincode})
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={
                                                        lead.status === 'pending' 
                                                            ? "bg-yellow-100 text-yellow-800" 
                                                            : "bg-green-100 text-green-800"
                                                    }>
                                                        {lead.status.toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminLeads;
