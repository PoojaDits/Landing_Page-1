import React, { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import toast from 'react-hot-toast'
import { FaSave } from 'react-icons/fa'

const CustomerProfile: React.FC = () => {
    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)
    const setAuth = useAuthStore((state) => state.setAuth)

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
    })
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const startEditing = () => {
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
        })
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)

        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
        })
    }

    const handleSave = async () => {
        if (!user) return

        setIsSaving(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 600))

            const updatedUser = {
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            }


            if (token) {
                setAuth(updatedUser, token)
            }

            toast.success('Profile updated successfully!')
            setIsEditing(false)
        } catch {
            toast.error('Failed to update profile')
        } finally {
            setIsSaving(false)
        }
    }

    if (!user) {
        return (
            <div className="max-w-3xl mx-auto p-8 text-center text-gray-400">
                Please log in to view your profile.
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-6 sm:p-8">

            <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Account</p>
                <h1 className="mt-2 text-4xl font-semibold text-white">My Profile</h1>
                <p className="mt-3 text-slate-300 max-w-2xl">
                    Update your personal details. Changes will be reflected across the platform.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-5">
                    <div className="bg-slate-950/90 rounded-3xl border border-white/10 p-8 h-full flex flex-col">
                        <div className="flex flex-col items-center text-center flex-1">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#e94560] via-[#f85c76] to-[#e94560] flex items-center justify-center text-white text-5xl font-bold shadow-xl shadow-black/30 mb-5">
                                {(formData.firstName?.[0] || 'U').toUpperCase()}
                                {(formData.lastName?.[0] || '').toUpperCase()}
                            </div>

                            <h2 className="text-2xl font-semibold text-white tracking-tight">
                                {formData.firstName} {formData.lastName}
                            </h2>
                            <p className="text-[#e94560] text-sm font-medium mt-1">Customer Account</p>

                            <div className="my-6 w-full border-t border-white/10" />

                            <div className="w-full space-y-4 text-left text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">User ID</span>
                                    <span className="font-mono text-white">{user.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Member since</span>
                                    <span className="text-white">2025</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Status</span>
                                    <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="lg:col-span-7">
                    <div className="bg-slate-950/90 rounded-3xl border border-white/10 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                            {!isEditing && (
                                <button
                                    onClick={startEditing}
                                    className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/20 text-sm font-medium text-white hover:bg-white/5 transition"
                                >
                                    ✏️ Edit Profile
                                </button>
                            )}
                        </div>

                        {isEditing ? (

                            <>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 block">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 focus:border-[#e94560] text-white rounded-2xl h-12 px-4 placeholder:text-gray-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 block">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 focus:border-[#e94560] text-white rounded-2xl h-12 px-4 placeholder:text-gray-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 focus:border-[#e94560] text-white rounded-2xl h-12 px-4 placeholder:text-gray-500 outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 block">Account Type</label>
                                        <div className="w-full bg-white/5 border border-white/10 text-white rounded-2xl h-12 px-4 flex items-center capitalize">
                                            {user.role?.replace('_', ' ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end gap-3">
                                    <button
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="px-6 h-11 rounded-2xl border border-white/20 text-sm font-medium text-white hover:bg-white/5 transition disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-[#e94560] hover:bg-[#c73652] disabled:opacity-70 transition text-white font-semibold px-8 h-11 rounded-2xl text-sm active:scale-[0.985]"
                                    >
                                        <FaSave className="text-base" />
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </>
                        ) : (

                            <div className="space-y-6 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">First Name</div>
                                        <div className="text-white text-lg font-medium">{user.firstName || '—'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Last Name</div>
                                        <div className="text-white text-lg font-medium">{user.lastName || '—'}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email Address</div>
                                    <div className="text-white text-lg font-medium">{user.email}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Account Type</div>
                                    <div className="text-white text-lg font-medium capitalize">{user.role?.replace('_', ' ')}</div>
                                </div>

                                <div className="pt-2 text-xs text-gray-500">
                                    Click "Edit Profile" above to update your information.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="mt-6 bg-slate-950/70 rounded-3xl border border-white/10 p-6">
                <h4 className="font-medium text-white mb-4">Security & Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-300">
                    <div>• Password last updated: <span className="text-gray-400">2 months ago</span></div>
                    <div>• Two-factor authentication: <span className="text-emerald-400 font-medium">Enabled</span></div>
                    <div className="md:col-span-2">
                        <button className="text-[#e94560] hover:underline text-sm font-medium mt-1">Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerProfile
