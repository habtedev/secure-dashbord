our compelete plane folder structure /project-root
│
├── server/
│ ├── src/
│ │ ├── controllers/
│ │ │ ├── authController.js
│ │ │ ├── userController.js
│ │ │ ├── adminController.js
│ │ │ └── activityLogController.js # Activity logs controller
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ ├── Admin.js
│ │ │ └── ActivityLog.js # Activity logs model
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ ├── userRoutes.js
│ │ │ ├── adminRoutes.js
│ │ │ └── docsRoutes.js # Swagger docs route
│ │ ├── middleware/
│ │ │ ├── authMiddleware.js
│ │ │ └── roleMiddleware.js
│ │ ├── services/
│ │ │ ├── userService.js
│ │ │ ├── adminService.js
│ │ │ └── activityLogService.js # Activity logs service
│ │ ├── utils/
│ │ ├── config/
│ │ ├── swagger.js # Swagger setup
│ │ ├── app.js
│ │ └── server.js
│ ├── prisma/
│ │ ├── schema.prisma # Add ActivityLog model
│ │ ├── migrations/
│ │ └── seed.js
│ ├── tests/
│ │ ├── unit/
│ │ │ ├── controllers/
│ │ │ ├── models/
│ │ │ ├── middleware/
│ │ │ └── services/
│ │ ├── integration/
│ │ │ ├── auth/
│ │ │ ├── user/
│ │ │ ├── admin/
│ │ │ └── activityLog/
│ │ └── setupTest.js
│ ├── Dockerfile
│ ├── .env
│ ├── package.json
│ ├── README.md
│ └── .github/
│ └── workflows/
│ └── ci.yml # GitHub Actions CI workflow
│
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── common/
│ │ │ │ └── ThemeToggle.jsx # Dark mode toggle
│ │ │ ├── auth/
│ │ │ ├── dashboard/
│ │ │ │ ├── user/
│ │ │ │ │ ├── UserSidebar.jsx
│ │ │ │ │ ├── UserHeader.jsx
│ │ │ │ │ └── UserContent.jsx
│ │ │ │ └── admin/
│ │ │ │ │ ├── AdminSidebar.jsx
│ │ │ │ │ ├── AdminHeader.jsx
│ │ │ │ │ ├── AdminContent.jsx
│ │ │ │ │ └── ActivityLogs.jsx # Admin activity logs UI
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── DashboardUser.jsx
│ │ │ └── DashboardAdmin.jsx
│ │ ├── hooks/
│ │ ├── context/
│ │ │ └── ThemeContext.js # Dark mode context
│ │ ├── services/
│ │ ├── styles/
│ │ │ └── dark.css # Dark mode styles
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── index.js
│ ├── tests/
│ │ ├── unit/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ └── utils/
│ │ ├── integration/
│ │ │ ├── pages/
│ │ │ │ ├── Login.test.jsx
│ │ │ │ └── Register.test.jsx
│ │ │ └── flows/
│ │ └── setupTest.js
│ ├── Dockerfile
│ ├── .env
│ ├── package.json
│ ├── README.md
│ └── .github/
│ └── workflows/
│ └── ci.yml # GitHub Actions CI workflow
│
├── docs/
│ └── architecture.md
│
├── docker-compose.yml
├── .dockerignore
└── README.md
