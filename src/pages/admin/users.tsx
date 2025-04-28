export const runtime = "experimental-edge";

import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { toast } from 'sonner';
import {
    Loader2,
    Plus,
    Search,
    Edit,
    Trash2,
    MoreHorizontal,
    CheckCircle,
} from 'lucide-react';
import AdminLayout from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { hasRole, UserRole } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: UserRole;
    createdAt: string;
}

interface PaginationInfo {
    total: number;
    pages: number;
    page: number;
    limit: number;
}

export default function UsersPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        total: 0,
        pages: 0,
        page: 1,
        limit: 10,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [roleFilter, setRoleFilter] = useState<string>('');

    // Create user dialog state
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'viewer' as UserRole,
        sendInvite: true,
    });
    const [isCreating, setIsCreating] = useState(false);

    // Edit user dialog state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Delete confirmation dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch users on component mount and when pagination/filters change
    useEffect(() => {
        fetchUsers();
    }, [pagination.page, pagination.limit, roleFilter]);

    // Function to fetch users
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
            });

            if (roleFilter) {
                queryParams.append('role', roleFilter);
            }

            const response = await fetch(`/api/admin/users?${queryParams}`);

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data.users);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to search users
    const searchUsers = async () => {
        if (!searchTerm.trim()) {
            return fetchUsers();
        }

        setIsSearching(true);
        try {
            const response = await fetch(`/api/admin/users?search=${encodeURIComponent(searchTerm)}`);

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setUsers(data.users);
            // Don't update pagination since this is a search result
        } catch (error) {
            console.error('Error searching users:', error);
            toast.error('Search failed. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    // Function to handle search form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        searchUsers();
    };

    // Function to clear search
    const clearSearch = () => {
        setSearchTerm('');
        fetchUsers();
    };

    // Function to handle page change
    const changePage = (newPage: number) => {
        if (newPage > 0 && newPage <= pagination.pages) {
            setPagination({ ...pagination, page: newPage });
        }
    };

    // Function to create a new user
    const createUser = async () => {
        setIsCreating(true);
        try {
            // Simple validation
            if (!newUser.email) {
                toast.error('Email is required');
                return;
            }

            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create user');
            }

            toast.success('User created successfully');
            setCreateDialogOpen(false);

            // Reset form
            setNewUser({
                name: '',
                email: '',
                role: 'viewer',
                sendInvite: true,
            });

            // Refresh user list
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to create user');
        } finally {
            setIsCreating(false);
        }
    };

    // Function to update a user
    const updateUser = async () => {
        if (!editingUser) return;

        setIsUpdating(true);
        try {
            const response = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editingUser.id,
                    name: editingUser.name,
                    role: editingUser.role,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update user');
            }

            toast.success('User updated successfully');
            setEditDialogOpen(false);

            // Refresh user list
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update user');
        } finally {
            setIsUpdating(false);
        }
    };

    // Function to delete a user
    const deleteUser = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/admin/users?id=${userToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete user');
            }

            toast.success('User deleted successfully');
            setDeleteDialogOpen(false);

            // Refresh user list
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to delete user');
        } finally {
            setIsDeleting(false);
        }
    };

    // Function to get role badge color
    const getRoleBadgeVariant = (role: UserRole) => {
        switch (role) {
            case 'admin':
                return 'default';
            case 'editor':
                return 'secondary';
            case 'viewer':
                return 'outline';
            default:
                return 'outline';
        }
    };

    return (
        <AdminLayout>
            <Head>
                <title>User Management | RiseNext Admin</title>
            </Head>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                    <p className="text-sm text-gray-500">Manage admin users and their roles</p>
                </div>
                <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className="space-y-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="search"
                                        placeholder="Search by email or name..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" disabled={isSearching}>
                                    {isSearching ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        'Search'
                                    )}
                                </Button>
                                {searchTerm && (
                                    <Button variant="outline" onClick={clearSearch} type="button">
                                        Clear
                                    </Button>
                                )}
                            </form>

                            <div className="flex items-center gap-2">
                                <Label htmlFor="role-filter" className="hidden md:inline">Role:</Label>
                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                    <SelectTrigger id="role-filter" className="w-[180px]">
                                        <SelectValue placeholder="All roles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All roles</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="px-6">
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                            {pagination.total} total users
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[60px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-500">Loading users...</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : users.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                <p className="text-sm text-gray-500">No users found</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarFallback>
                                                                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{user.name || '(No name)'}</p>
                                                            <p className="text-sm text-gray-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getRoleBadgeVariant(user.role)}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Actions</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => {
                                                                setEditingUser(user);
                                                                setEditDialogOpen(true);
                                                            }}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => {
                                                                setUserToDelete(user);
                                                                setDeleteDialogOpen(true);
                                                            }} className="text-red-600">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => changePage(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                >
                                    Previous
                                </Button>
                                <div className="text-sm text-gray-500">
                                    Page {pagination.page} of {pagination.pages}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => changePage(pagination.page + 1)}
                                    disabled={pagination.page === pagination.pages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Create User Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Create a new admin user and assign their role
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={newUser.role}
                                onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-gray-500 mt-1">
                                {newUser.role === 'admin' ? 'Full access to all features' :
                                    newUser.role === 'editor' ? 'Can edit content but not manage users' :
                                        'Can only view dashboard and content'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="send-invite"
                                checked={newUser.sendInvite}
                                onCheckedChange={(checked) =>
                                    setNewUser({ ...newUser, sendInvite: checked as boolean })
                                }
                            />
                            <Label htmlFor="send-invite" className="text-sm font-normal">
                                Send email invitation with temporary password
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={createUser} disabled={isCreating}>
                            {isCreating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Create User
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user details and permissions
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="John Doe"
                                    value={editingUser.name || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={editingUser.email}
                                    disabled
                                />
                                <p className="text-xs text-gray-500">Email cannot be changed</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-role">Role</Label>
                                <Select
                                    value={editingUser.role}
                                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value as UserRole })}
                                >
                                    <SelectTrigger id="edit-role">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-gray-500 mt-1">
                                    {editingUser.role === 'admin' ? 'Full access to all features' :
                                        editingUser.role === 'editor' ? 'Can edit content but not manage users' :
                                            'Can only view dashboard and content'}
                                </p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={updateUser} disabled={isUpdating}>
                            {isUpdating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. The user will be permanently removed.
                        </DialogDescription>
                    </DialogHeader>
                    {userToDelete && (
                        <div className="py-4">
                            <p>Are you sure you want to delete the following user?</p>
                            <div className="mt-2 p-4 bg-gray-50 rounded-md">
                                <p className="font-medium">{userToDelete.name || '(No name)'}</p>
                                <p className="text-sm text-gray-500">{userToDelete.email}</p>
                                <Badge className="mt-2" variant={getRoleBadgeVariant(userToDelete.role)}>
                                    {userToDelete.role.charAt(0).toUpperCase() + userToDelete.role.slice(1)}
                                </Badge>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={deleteUser} disabled={isDeleting}>
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete User'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        // Check if user is authenticated and has admin role
        const isAdmin = await hasRole('admin', ctx.req as any);

        if (!isAdmin) {
            return {
                redirect: {
                    destination: '/admin/unauthorized',
                    permanent: false,
                },
            };
        }

        return {
            props: {}
        };
    } catch (error) {
        console.error('Error checking admin permissions:', error);
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }
};