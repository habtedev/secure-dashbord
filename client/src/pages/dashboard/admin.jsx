import React from 'react'
import DashboardStats from '../../components/dashboard/admin/DashboardStats'
import UserManagement from '../../components/dashboard/admin/UserManagement'
import RoleManagement from '../../components/dashboard/admin/RoleManagement'
import ContentControl from '../../components/dashboard/admin/ContentControl'
import Payments from '../../components/dashboard/admin/Payments'
import EmailBroadcasts from '../../components/dashboard/admin/EmailBroadcasts'
import Tickets from '../../components/dashboard/admin/Tickets'
import Logs from '../../components/dashboard/admin/Logs'
import AdminSettings from '../../components/dashboard/admin/AdminSettings'

const AdminDashboardPage = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <DashboardStats />
    <UserManagement />
    <RoleManagement />
    <ContentControl />
    <Payments />
    <EmailBroadcasts />
    <Tickets />
    <Logs />
    <AdminSettings />
  </div>
)

export default AdminDashboardPage
