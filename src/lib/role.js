export const ROLES = {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
};

export const ROLE_LABELS = {
    [ROLES.CUSTOMER]: 'Customer',
    [ROLES.ADMIN]: 'Admin',
    [ROLES.SUPER_ADMIN]: 'Super Admin',
};

export const DASHBOARD_PATHS = {
    [ROLES.CUSTOMER]: '/customer/home',
    [ROLES.ADMIN]: '/admin/dashboard',
    [ROLES.SUPER_ADMIN]: '/super-admin/dashboard',
};

export function getStoredUser() {
    try { 
        return JSON.parse(localStorage.getItem('myUser')); 
    } catch {
         return null; 
    }
}

export function getUserRole() {
    const user = getStoredUser();
    return user?.role || ROLES.CUSTOMER;
}

export function isLoggedIn() {
    return !!localStorage.getItem('myToken') && !!getStoredUser();
}

export function storeLogin(userData, token) {
    localStorage.setItem('myToken', token);
    localStorage.setItem('myUser', JSON.stringify(userData));

    localStorage.removeItem('impersonator');
}

export function clearAuth() {
    localStorage.removeItem('myToken');
    localStorage.removeItem('myUser');
    localStorage.removeItem('impersonator');
}

export function hasRole(...roles) {
    return roles.includes(getUserRole());
}

export function getDashboardPath() {
    return DASHBOARD_PATHS[getUserRole()] || '/';
}


export function startImpersonation(targetUser) {
    const currentUser = getStoredUser();
    if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
        throw new Error('Only Super Admin can impersonate');
    }
    
    localStorage.setItem('impersonator', JSON.stringify(currentUser));
    
    storeLogin(targetUser, 'impersonate-token-' + Date.now());
}

export function stopImpersonation() {
    const original = localStorage.getItem('impersonator');
    if (original) {
        const admin = JSON.parse(original);
        localStorage.removeItem('impersonator');
        storeLogin(admin, 'restored-token-' + Date.now());
        return true;
    }
    return false;
}

export function isImpersonating() {
    return !!localStorage.getItem('impersonator');
}

export function getImpersonator() {
    try {
        return JSON.parse(localStorage.getItem('impersonator'));
    } catch {
        return null;
    }
}