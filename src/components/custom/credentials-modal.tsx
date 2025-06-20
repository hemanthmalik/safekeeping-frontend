"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Credentials } from "@/models/credentials";

interface CredentialsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (credentials: Credentials) => void;
    title?: string;
}

export default function CredentialsModal({
    isOpen,
    onClose,
    onSubmit,
    title = "Add New Credentials"
}: CredentialsModalProps) {
    const defaultFormData: Credentials = {
        platform: '',
        username: '',
        password: ''
    };
    const [formData, setFormData] = useState(defaultFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.platform && formData.username && formData.password) {
            onSubmit(formData);
            // Reset form
            setFormData(defaultFormData);
            onClose();
        }
    };

    const handleCancel = () => {
        // Reset form when closing
        setFormData(defaultFormData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50"
                onClick={handleCancel}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
                            Platform
                        </label>
                        <Input
                            id="platform"
                            name="platform"
                            type="text"
                            value={formData.platform}
                            onChange={handleInputChange}
                            placeholder="Enter platform name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="text"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add Credentials
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
