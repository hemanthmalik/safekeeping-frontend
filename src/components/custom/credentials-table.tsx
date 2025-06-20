"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CredentialsModal from "@/components/custom/credentials-modal";
import { CredentialEntry } from "@/models/credential_entry";
import { Credentials } from "@/models/credentials";
import { Eye, EyeOff, Shield, Plus, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CredentialsTable() {
    const [data, setData] = useState<CredentialEntry[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddCredentials = (credentials: Credentials) => {
        const newCredential = {
            serial: data.length + 1,
            ...credentials
        };
        setData(prev => [...prev, newCredential]);
    };

    const togglePasswordVisibility = (serial: number) => {
        const newVisiblePasswords = new Set(visiblePasswords);
        if (newVisiblePasswords.has(serial)) {
            newVisiblePasswords.delete(serial);
        } else {
            newVisiblePasswords.add(serial);
        }
        setVisiblePasswords(newVisiblePasswords);
    };

    const handleDelete = (serial: number) => {
        setData(prev => prev.filter(item => item.serial !== serial));
    };

    const filteredData = data.filter(item =>
        item.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                <Shield className="w-8 h-8 text-blue-600" />
                                Local Password Manager
                            </h1>
                            <p className="text-gray-600">
                                Manage your credentials securely in one place
                            </p>
                        </div>
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Credentials
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search platforms or usernames..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 w-full"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Credentials</p>
                                <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Platforms</p>
                                <p className="text-2xl font-bold text-gray-900">{new Set(data.map(c => c.platform)).size}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Filtered Results</p>
                                <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Search className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Platform
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Password
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Shield className="w-16 h-16 mb-4 text-gray-300" />
                                                <p className="text-xl font-medium mb-2">No credentials found</p>
                                                <p className="text-sm">
                                                    {data.length === 0 
                                                        ? "Start by adding your first credential" 
                                                        : "Try adjusting your search terms"
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr 
                                            key={item.serial} 
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                                    {item.serial}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg">
                                                        <Shield className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {item.platform}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                                                    {item.username}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg border">
                                                        {visiblePasswords.has(item.serial) 
                                                            ? item.password 
                                                            : "•".repeat(Math.min(item.password.length, 12))
                                                        }
                                                    </code>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => togglePasswordVisibility(item.serial)}
                                                        className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        {visiblePasswords.has(item.serial) ? (
                                                            <EyeOff className="w-4 h-4" />
                                                        ) : (
                                                            <Eye className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(item.serial)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>🔒 Keep your credentials secure and organized</p>
                </div>
            </div>

            <CredentialsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddCredentials}
            />
        </div>
    );
}