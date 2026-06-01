# Inventory and Order Management System

A premium, modern, and robust full-stack application designed for managing inventory, customers, and orders with advanced owner-based authorization and real-time operations.

## Architecture and Technology Stack

The application is structured into two main decoupled modules:

### Backend Services
- Framework: FastAPI (Python)
- Database: PostgreSQL hosted on Neon (Serverless)
- Database ORM: SQLAlchemy with Alembic migrations
- Security: JWT-based local token encryption and mock login features for seamless environment staging

### Frontend Application
- Framework: React with Vite
- Styling: Vanilla CSS focusing on dynamic interactive elements, harmonious palettes, glassmorphic filters, and interactive micro-animations
- Bundler: oxc-compiled lightning-fast Vite environment

---

## Core Features

### 1. Creator-Based Access Control and Security
- Owner Protection: Products, Customers, and Orders are associated with the manager (user) who added them.
- REST Security: Backend APIs check owner relationships (using user_id validation) and throw 403 Forbidden errors if another manager attempts to modify or delete the record.
- UI Level Hiding: Action buttons (Edit/Delete) are automatically hidden for unauthorized managers to preserve clean UX layouts.
- System Orphans Prevention: Older/legacy records without a declared owner are marked as "System" and remain editable/deletable by all active managers to prevent record orphaned locks.

### 2. Segmented Filtering Toggles
- Granular Toggle Controls: Integrated segmented UI controls on Products, Customers, and Orders tabs.
- "My" vs "All" modes: Enables managers to instantly switch between displaying only their own records ("My Products", "My Customers", "My Orders") and looking at the global warehouse logs ("All Products", "All Customers", "All Orders").
- Default State: Each tab automatically defaults to the user's specific records ("My" mode) on initial navigation.

### 3. Smart Sorting and Constraints
- Natural Numeric Sorting: The products list sorts naturally (e.g. SKU-9 precedes SKU-10) using numeric locale comparisons instead of basic alphabetical comparisons.
- Stock Sorting: The Inventory dashboard sorting places critical and low-stock products at the very top of the table.
- Transact Stock Controls: Ordering items automatically deducts quantities in a single transaction, validation fails if requested volume exceeds stock levels, and cancelling/deleting orders restocks items immediately.

---

## Running Locally

### Prerequisites
- Node.js (version 18 or newer)
- Python (version 3.10 or newer)
- Docker and Docker Compose (Optional)

### Using Docker Compose
Run the following command at the root of the workspace to launch the entire environment:
```bash
docker-compose up --build
```
The frontend will be exposed at http://localhost:3000 and the backend API at http://localhost:8000.

### Manual Setup

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Uvicorn development server:
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
