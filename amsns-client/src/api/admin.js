import { client } from "./client";

export const adminApi = {
  getAllUsers: (skip = 0, limit = 100) => 
    client.get(`/admin/users?skip=${skip}&limit=${limit}`),
    
  getUserDetails: (uid) => 
    client.get(`/admin/users/${uid}`),
    
  approveKyc: (uid, approved, rejectionReason) => 
    client.post(`/admin/users/${uid}/approve-kyc`, { approved, rejection_reason: rejectionReason }),
    
  updateApplicationStatus: (uid, service, status) => 
    client.post(`/admin/users/${uid}/services/${service}/update-status`, { status }),
};
