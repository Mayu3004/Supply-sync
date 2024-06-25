
export const manufacturerSidebarItems = [
    { name: 'Products', path: "/manufacturer/products" },
    { name: 'Inventory', path: "/manufacturer/inventory" },
    { name: 'Orders', path: '/manufacturer/orders' },
    { 
        name: 'Reports', 
        path: '/manufacturer/reports',
        subItems: [
            { name: 'Top Moving Products', path: '/manufacturer/reports/top-moving-products' },
            { name: 'Top Distributors', path: '/manufacturer/reports/top-distributors' },
            { name: 'Sales Chart', path: '/manufacturer/reports/sales-chart' }
        ]
    },
    { 
        name: 'Merchandise', 
        path: '/manufacturer/merchandise',
        subItems:[
            {name:'All Merchandise',path:'/manufacturer/merchandise/allmerchandise'},
            {name:'Requested Merchandise',path:'/manufacturer/merchandise/requestedmerchandise'},
        ]
    },
    { name: 'Customers', path: '/manufacturer/customers' },
    { name: 'Distributors', path: '/manufacturer/distributors' },
    { name: 'Profile', path: '/manufacturer/profile' },
];


export const distributorSidebarItems = [
    { name: 'Inventory',path: '/distributor/inventory',
    },
    { name: 'Reports', path: '/distributor/reports' },
    {
        name: 'Requests',
        path: '/distributor/requests',
        subItems: [
            { name: 'Orders', path: '/distributor/requests/orders' },
            { name: 'Merchandise', path: '/distributor/requests/merchandise' },
        ],
    },
    { name: 'Sales', path: '/distributor/sales' },
    { name: 'Profile', path: '/distributor/profile' },
];
