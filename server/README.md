# Secure Dashboard & Authentication System

## Project Structure

This project follows a scalable, secure full-stack architecture for authentication and dashboard features. Below is the recommended folder structure for both backend and frontend, including 2FA, multi-tenant, admin, and user flows.

### Backend (server)

```
server/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── adminController.ts
│   │   ├── tenantController.ts
│   │   ├── integrationController.ts
│   │   ├── notificationController.ts
│   │   └── activityLogController.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── adminRoutes.ts
│   │   ├── tenantRoutes.ts
│   │   ├── integrationRoutes.ts
│   │   ├── notificationRoutes.ts
│   │   └── docsRoutes.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   ├── tenantMiddleware.ts
│   │   ├── integrationMiddleware.ts
│   │   └── errorHandler.ts
│   ├── services/
│   │   ├── userService.ts
│   │   ├── adminService.ts
│   │   ├── tenantService.ts
│   │   ├── integrationService.ts
│   │   ├── notificationService.ts
│   │   └── activityLogService.ts
│   ├── utils/
│   │   ├── email.ts
│   │   ├── sms.ts
│   │   ├── token.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   ├── config/
│   │   ├── db.ts
│   │   ├── passport.ts
│   │   ├── thirdParty.ts
│   │   └── env.ts
│   ├── swagger.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── admin/
│   │   ├── tenant/
│   │   ├── integration/
│   │   ├── notification/
│   │   └── activityLog/
│   └── setupTest.ts
├── scripts/
├── Dockerfile
├── .env
├── package.json
├── README.md
└── .github/
    └── workflows/
        └── ci.yml
```

### Frontend (client)

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ThemeToggle.tsx
│   │   ├── auth/
│   │   ├── dashboard/
│   │   │   ├── user/
│   │   │   │   ├── UserSidebar.tsx
│   │   │   │   ├── UserHeader.tsx
│   │   │   │   └── UserContent.tsx
│   │   │   └── admin/
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── AdminHeader.tsx
│   │   │   │   ├── AdminContent.tsx
│   │   │   │   └── ActivityLogs.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── DashboardUser.tsx
│   │   └── DashboardAdmin.tsx
│   ├── hooks/
│   ├── context/
│   │   └── ThemeContext.ts
│   ├── services/
│   ├── styles/
│   │   └── dark.css
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── integration/
│   │   ├── pages/
│   │   │   ├── Login.test.tsx
│   │   │   └── Register.test.tsx
│   │   └── flows/
│   └── setupTest.ts
├── Dockerfile
├── .env
├── package.json
├── README.md
└── .github/
    └── workflows/
        └── ci.yml
```

## Key Features

- 2FA (TOTP, email, SMS)
- Multi-tenant support
- Admin/user dashboards
- Integration with third-party APIs
- Centralized error handling
- Unit and integration tests
- Dockerized for local and cloud deployment

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in secrets
3. Run `docker-compose up` for local development
4. See `docs/architecture.md` for more details
