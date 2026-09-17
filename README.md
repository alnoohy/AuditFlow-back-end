# AuditFlow

![AuditFlow Logo](./assets/logo%20auditflow%20.png)

AuditFlow is a full-stack MERN application that helps companies manage internal audit requests in one place, replacing scattered emails, spreadsheets, and files. Auditors create and assign audit requests to employees, employees submit evidence or comments in response, and auditors review each submission — approving it, rejecting it, or requesting changes. Admins and managers oversee users, departments, categories, and overall audit progress through a dashboard.

## User Stories

1. **User:** As a user, I want to sign up and sign in so that I can securely access AuditFlow.
2. **User:** As a user, I want to sign out so that I can securely end my session.
3. **User:** As a user, I want role-based access so that I can only view and perform actions allowed for my role.
4. **User:** As a user, I want to see the status of an audit request so that I know whether it is pending, under review, completed, rejected, or overdue.
5. **User:** As a user, I want to search and filter audit requests so that I can quickly find the requests I need.
6. **Auditor:** As an auditor, I want to create a new audit request so that I can request information or evidence from an employee.
7. **Auditor:** As an auditor, I want to assign an audit request to an employee so that the correct person can respond to it.
8. **Auditor:** As an auditor, I want to add a deadline and priority to an audit request so that important requests can be handled on time.
9. **Auditor:** As an auditor, I want to view all audit requests so that I can track their progress.
10. **Auditor:** As an auditor, I want to edit or delete an audit request so that I can correct or remove requests when needed.
11. **Auditor:** As an auditor, I want to review an employee's submission so that I can decide whether it meets the audit requirements.
12. **Auditor:** As an auditor, I want to approve, reject, or request changes to a submission so that the audit request has a clear outcome.
13. **Employee:** As an employee, I want to view audit requests assigned to me so that I know what information I need to provide.
14. **Employee:** As an employee, I want to submit evidence, information, or comments for an audit request so that the auditor can review my response.
15. **Employee:** As an employee, I want to update my submission when changes are requested so that I can complete the audit request correctly.
16. **Admin/Manager:** As an admin, I want to manage users and their roles so that employees and auditors have the correct access.
17. **Admin/Manager:** As an admin, I want to manage departments and audit categories so that requests can be properly organized.
18. **Admin/Manager:** As a manager, I want to view a dashboard showing pending, completed, overdue, and rejected requests so that I can monitor overall audit progress.

## Getting Started

- **Deployed App:** [Click Here](https://audit-flow-front-end-lemon.vercel.app)
- **Planning Materials:**
  - [Wireframes](https://excalidraw.com/#room=ccd0e8d448d3de0f4ac1,6KtkHPFMsoRzh5NiOaCobg)
- **Front-End Repository:** [AuditFlow-front-end](https://github.com/alnoohy/AuditFlow-front-end)

## Technologies Used

- React
- JavaScript (ES6+)
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- CSS (Flexbox / Grid)

## ERD
![alt text](./assets/ERD.png)

## Front-End Routes

![alt text](./assets/image.png)
# AuditFlow - Front-End Routes

| Route | Page / Description |
| :--- | :--- |
| `/` | Landing Page |
| `/sign-up` | Sign Up |
| `/sign-in` | Sign In |
| `/dashboard` | Dashboard |
| `/audit-requests` | Audit Requests |
| `/audit-requests/new` | Create Request |
| `/audit-requests/:requestId` | Request Details |
| `/audit-requests/:requestId/edit` | Edit Request |
| `/audit-requests/:requestId/submit` | Submit Evidence |
| `/admin/users` | Manage Users |
| `/admin/departments` | Manage Departments |
## Back-End Routes

![alt text](./assets/image-1.png)
# AuditFlow - Back-End Routes

## AUTH

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/auth/sign-up` | Register a new user account. |
| **POST** | `/auth/sign-in` | Authenticate an existing user and return a JWT. |

---

## AUDIT REQUESTS

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/audit-requests` | Retrieve all audit requests (with search, sort, and role-based filters). |
| **POST** | `/audit-requests` | Create and assign a new audit request (Auditor/Admin only). |
| **GET** | `/audit-requests/:requestId` | Retrieve details for a single audit request. |
| **PUT** | `/audit-requests/:requestId` | Update an existing audit request (Auditor/Admin only). |
| **DELETE** | `/audit-requests/:requestId` | Delete an audit request (Auditor/Admin only). |

---

## SUBMISSIONS

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/audit-requests/:requestId/submissions` | Submit evidence, info, or comments for an audit request (Employee/Auditor). |
| **PUT** | `/audit-requests/:requestId/submissions/:submissionId` | Update a submission or review/update its status (Approve, Reject, Request Changes). |
| **DELETE** | `/audit-requests/:requestId/submissions/:submissionId` | Delete a specific submission. |

---

## USERS

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/users` | Retrieve all system users (Admin/Manager only). |
| **PUT** | `/users/:userId` | Update a user's details, role, or department (Admin only). |
| **DELETE** | `/users/:userId` | Deactivate or delete a user account (Admin only). |
## Component Diagram

![alt text](./assets/image-3.png)

## Next Steps (Future Enhancements)

- Email or in-app notifications when a request is assigned, updated, or nearing its deadline.
- Audit trail/history log showing every status change on a request.
- File attachments with previews (PDF/image) instead of a single evidence link.
- Exportable reports (CSV/PDF) for completed and overdue audits.
- Commenting/discussion thread on each audit request between auditor and employee.

## Attributions

- PLACEHOLDER_ATTRIBUTION_LINK_OR_NONE
